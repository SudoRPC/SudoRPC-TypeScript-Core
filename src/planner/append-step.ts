/**
 * @author WMXPY
 * @namespace Planner
 * @description Append Step
 */

import { SudoRPCExecutionPlanStep, AvailableResource, SUDORPC_PLAN_EXECUTE_STEP_REASON } from "./declare";

export const sudoRPCAppendCallStep = <Metadata, Payload, SuccessResult, FailResult>(
    steps: Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>>,
    resource: AvailableResource<Metadata, Payload, SuccessResult, FailResult>,
): Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>> => {

    const result: Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>> = [
        ...steps,
        {
            reason: SUDORPC_PLAN_EXECUTE_STEP_REASON.CALL,
            resource,
        },
    ];
    return result;
};
