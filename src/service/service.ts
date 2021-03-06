/**
 * @author WMXPY
 * @namespace Service
 * @description Service
 */

import { SudoRPCHandlerContext } from "../handler/context";
import { SudoRPCEndpointResourceHandlerReturnObject, SudoRPCMiddlewareResourceHandlerShouldAbortReturnObject } from "../handler/declare";
import { SudoRPCEndpointHandlerHelper } from "../handler/helper/endpoint-helper";
import { AvailableResource, SudoRPCExecutionPlan, SudoRPCExecutionPlanStep, SUDORPC_EXECUTE_PLAN_NOT_SATISFIED_REASON } from "../planner/declare";
import { sudoRPCNoParallelOrganizeSteps, sudoRPCOrganizeSteps } from "../planner/organize-step";
import { SudoRPCPlanner } from "../planner/planner";
import { SudoRPCCall } from "../structure/call";
import { SudoRPCReturn } from "../structure/return";
import { executeCallResource } from "./call-executer";
import { DefaultSudoRPCServiceConfiguration, ISudoRPCService, SudoRPCServiceConfiguration, SudoRPCServiceMixin } from "./declare";
import { executeParallelAvailableResourceListAsMiddleware } from "./dependency-executer";
import { SudoRPCServiceErrorGenerator } from "./error/error-generator";

export class SudoRPCService<Metadata, Payload, SuccessResult, FailResult> implements
    ISudoRPCService<Metadata, Payload, SuccessResult, FailResult> {

    public static create<Metadata, Payload, SuccessResult, FailResult>(
        serviceName: string,
        configuration?: SudoRPCServiceConfiguration,
    ): SudoRPCService<Metadata, Payload, SuccessResult, FailResult> {

        const fixedConfiguration: SudoRPCServiceConfiguration = {
            ...DefaultSudoRPCServiceConfiguration,
            ...configuration,
        };

        return new SudoRPCService<Metadata, Payload, SuccessResult, FailResult>(
            serviceName,
            fixedConfiguration,
        );
    }

    private readonly _serviceName: string;
    private readonly _configuration: SudoRPCServiceConfiguration;

    private readonly _planner: SudoRPCPlanner<Metadata, Payload, SuccessResult, FailResult>;

    private constructor(
        serviceName: string,
        configuration: SudoRPCServiceConfiguration,
    ) {

        this._serviceName = serviceName;
        this._configuration = configuration;

        this._planner = SudoRPCPlanner.create<Metadata, Payload, SuccessResult, FailResult>();
    }

    public get serviceName(): string {
        return this._serviceName;
    }

    public register(
        resource: AvailableResource<Metadata, Payload, SuccessResult, FailResult>,
    ): this {

        this._planner.register(resource);
        return this;
    }

    public useMixin(
        mixin: SudoRPCServiceMixin<Metadata, Payload, SuccessResult, FailResult>,
    ): this {

        mixin(this);
        return this;
    }

    public async execute(
        call: SudoRPCCall<Metadata, Payload>,
    ): Promise<SudoRPCReturn<SuccessResult, FailResult>> {

        const errorGenerator: SudoRPCServiceErrorGenerator<Metadata, Payload, SuccessResult, FailResult> =
            SudoRPCServiceErrorGenerator.create<Metadata, Payload, SuccessResult, FailResult>(call);

        try {

            return await this._executeUnsafe(call, errorGenerator);
        } catch (error) {

            return errorGenerator.createUnknownInternalError();
        }
    }

    private async _executeUnsafe(
        call: SudoRPCCall<Metadata, Payload>,
        errorGenerator: SudoRPCServiceErrorGenerator<Metadata, Payload, SuccessResult, FailResult>,
    ): Promise<SudoRPCReturn<SuccessResult, FailResult>> {

        if (!this._planner.verifyTargetCallResource(call)) {
            return errorGenerator.createExecutePlanNotSatisfiedInternalError({
                reason: SUDORPC_EXECUTE_PLAN_NOT_SATISFIED_REASON.RESOURCE_NOT_FOUND,
                resource: call.resource,
            });
        }

        const dependenciesPlan: SudoRPCExecutionPlan<Metadata, Payload, SuccessResult, FailResult>
            = this._planner.planDependencies(call);

        if (!dependenciesPlan.satisfiable) {
            return errorGenerator.createExecutePlanNotSatisfiedInternalError(dependenciesPlan);
        }

        const organizedSteps: Array<Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>>>
            = this._organizeSteps(dependenciesPlan.steps);

        const context: SudoRPCHandlerContext<Metadata, Payload> =
            this._createContext(call);

        for (const steps of organizedSteps) {

            const stepsResult: Array<SudoRPCMiddlewareResourceHandlerShouldAbortReturnObject<FailResult>> =
                await executeParallelAvailableResourceListAsMiddleware(
                    steps.map((
                        step: SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>,
                    ) => {
                        return step.resource;
                    }),
                    call,
                    context,
                );

            if (stepsResult.length !== 0) {

                return errorGenerator.createErrors(stepsResult.map((
                    item: SudoRPCMiddlewareResourceHandlerShouldAbortReturnObject<FailResult>,
                ) => {
                    return {
                        error: item.error,
                        message: item.message,
                        result: item.result,
                    };
                }));
            }
        }

        const callPlan: SudoRPCExecutionPlan<Metadata, Payload, SuccessResult, FailResult>
            = this._planner.planCall(call);

        if (!callPlan.satisfiable) {
            return errorGenerator.createExecutePlanNotSatisfiedInternalError(callPlan);
        }

        if (callPlan.steps.length !== 1) {
            return errorGenerator.createUnknownInternalError();
        }

        const callStep: SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>
            = callPlan.steps[0];

        const callExecuteResult: SudoRPCEndpointResourceHandlerReturnObject<SuccessResult, FailResult>
            = await executeCallResource(callStep.resource, call, context);

        if (!callExecuteResult.success) {
            return errorGenerator.createErrors([{
                error: callExecuteResult.error,
                message: callExecuteResult.message,
                result: callExecuteResult.result,
            }]);
        }

        return {
            version: '1.0',
            identifier: call.identifier,
            success: true,
            result: callExecuteResult.result,
        };
    }

    private _organizeSteps(
        steps: Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>>,
    ): Array<Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>>> {

        if (this._configuration.noParallel) {
            return sudoRPCNoParallelOrganizeSteps(steps);
        }

        return sudoRPCOrganizeSteps(steps);
    }

    private _createContext(call: SudoRPCCall<Metadata, Payload>): SudoRPCHandlerContext<Metadata, Payload> {

        const context: SudoRPCHandlerContext<Metadata, Payload> =
            SudoRPCHandlerContext.create(call);

        return context;
    }

    private _createHelper(
        call: SudoRPCCall<Metadata, Payload>,
    ): SudoRPCEndpointHandlerHelper<Metadata, Payload, SuccessResult, FailResult> {

        const helper: SudoRPCEndpointHandlerHelper<Metadata, Payload, SuccessResult, FailResult> =
            SudoRPCEndpointHandlerHelper.create(call);

        return helper;
    }
}
