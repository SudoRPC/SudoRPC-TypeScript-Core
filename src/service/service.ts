/**
 * @author WMXPY
 * @namespace Service
 * @description Service
 */

import { SudoRPCMiddlewareResourceHandlerShouldAbortReturnObject } from "../handler/declare";
import { AvailableResource, SudoRPCExecutionPlan, SudoRPCExecutionPlanStep } from "../planner/declare";
import { sudoRPCNoParallelOrganizeSteps, sudoRPCOrganizeSteps } from "../planner/organize-step";
import { SudoRPCPlanner } from "../planner/planner";
import { SudoRPCCall } from "../structure/call";
import { SudoRPCReturn } from "../structure/return";
import { DefaultSudoRPCServiceConfiguration, ISudoRPCService, SudoRPCServiceConfiguration, SudoRPCServiceMixin } from "./declare";
import { SudoRPCServiceErrorGenerator } from "./error/error-generator";
import { executeParallelAvailableResourceListAsMiddleware } from "./executer";

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

        const plan: SudoRPCExecutionPlan<Metadata, Payload, SuccessResult, FailResult>
            = this._planner.planDependencies(call);

        if (!plan.satisfiable) {
            return errorGenerator.createExecutePlanNotSatisfiedInternalError(plan);
        }

        const organizedSteps: Array<Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>>>
            = this._organizeSteps(plan.steps);

        for (const steps of organizedSteps) {

            const stepsResult: Array<SudoRPCMiddlewareResourceHandlerShouldAbortReturnObject<FailResult>> =
                await executeParallelAvailableResourceListAsMiddleware(
                    steps.map((
                        step: SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>,
                    ) => {
                        return step.resource;
                    }),
                    call,
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

        return null as any;
    }

    private _organizeSteps(
        steps: Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>>,
    ): Array<Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>>> {

        if (this._configuration.noParallel) {
            return sudoRPCNoParallelOrganizeSteps(steps);
        }

        return sudoRPCOrganizeSteps(steps);
    }
}
