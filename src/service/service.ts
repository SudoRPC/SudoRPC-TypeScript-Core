/**
 * @author WMXPY
 * @namespace Service
 * @description Service
 */

import { AvailableResource, SudoRPCExecutionPlan } from "../planner/declare";
import { SudoRPCPlanner } from "../planner/planner";
import { SudoRPCCall } from "../structure/call";
import { SudoRPCReturn } from "../structure/return";
import { ISudoRPCService, SudoRPCServiceMixin } from "./declare";
import { SudoRPCServiceErrorGenerator } from "./error/error-generator";

export class SudoRPCService<Metadata, Payload, SuccessResult, FailResult> implements
    ISudoRPCService<Metadata, Payload, SuccessResult, FailResult> {

    public static create<Metadata, Payload, SuccessResult, FailResult>(
        serviceName: string,
    ): SudoRPCService<Metadata, Payload, SuccessResult, FailResult> {

        return new SudoRPCService<Metadata, Payload, SuccessResult, FailResult>(
            serviceName,
        );
    }

    private readonly _serviceName: string;

    private readonly _planner: SudoRPCPlanner<Metadata, Payload, SuccessResult, FailResult>;

    private constructor(
        serviceName: string,
    ) {

        this._serviceName = serviceName;

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
            = this._planner.plan(call);

        if (!plan.satisfiable) {

            return errorGenerator.createExecutePlanNotSatisfiedInternalError(plan);
        }

        return null as any;
    }
}
