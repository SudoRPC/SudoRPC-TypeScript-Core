/**
 * @author WMXPY
 * @namespace Service_Error
 * @description Error Generator
 */

import { SudoRPCExecutionNotSatisfiedPlan, SUDORPC_EXECUTE_PLAN_NOT_SATISFIED_REASON } from "../../planner/declare";
import { SudoRPCCall } from "../../structure/call";
import { SudoRPCReturn } from "../../structure/return";

export class SudoRPCServiceErrorGenerator<Metadata, Payload, SuccessResult, FailResult> {

    public static create<Metadata, Payload, SuccessResult, FailResult>(
        call: SudoRPCCall<Metadata, Payload>,
    ): SudoRPCServiceErrorGenerator<Metadata, Payload, SuccessResult, FailResult> {

        return new SudoRPCServiceErrorGenerator<Metadata, Payload, SuccessResult, FailResult>(
            call,
        );
    }

    private readonly _call: SudoRPCCall<Metadata, Payload>;

    private constructor(
        call: SudoRPCCall<Metadata, Payload>,
    ) {
        this._call = call;
    }

    public createInternalError(
        error: string,
        message: string,
    ): SudoRPCReturn<SuccessResult, FailResult> {

        return {
            version: '1.0',
            identifier: this._call.identifier,
            success: false,
            isInternalError: true,
            error,
            message,
        };
    }

    public createExecutePlanNotSatisfiedInternalError(
        plan: SudoRPCExecutionNotSatisfiedPlan,
    ): SudoRPCReturn<SuccessResult, FailResult> {

        switch (plan.reason) {

            case SUDORPC_EXECUTE_PLAN_NOT_SATISFIED_REASON.DEPENDENCY_NOT_FOUND:
                return this.createInternalError(
                    '[SudoRPC] Dependency Not Found',
                    `Dependency ${plan.dependency} not found`,
                );
            case SUDORPC_EXECUTE_PLAN_NOT_SATISFIED_REASON.DEPENDENCY_INFINITE_LOOP:
                return this.createInternalError(
                    '[SudoRPC] Dependency Infinite Loop',
                    `Dependency ${plan.dependency} is infinite loop`,
                );
            case SUDORPC_EXECUTE_PLAN_NOT_SATISFIED_REASON.RESOURCE_NOT_FOUND:
                return this.createInternalError(
                    '[SudoRPC] Resource Not Found',
                    `Resource ${plan.resource} not found`,
                );
            case SUDORPC_EXECUTE_PLAN_NOT_SATISFIED_REASON.UNKNOWN:
                return this.createInternalError(
                    '[SudoRPC] Unknown',
                    `Unknown`,
                );
        }
    }
}
