/**
 * @author WMXPY
 * @namespace Planner
 * @description Organize Step
 */

import { SudoRPCExecutionPlanStep } from "./declare";

export const sudoRPCOrganizeSteps = <Metadata, Payload, SuccessResult, FailResult>(
    steps: Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>>,
): Array<Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>>> => {

    return [];
};
