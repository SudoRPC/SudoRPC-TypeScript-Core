/**
 * @author WMXPY
 * @namespace Planner
 * @description Process Status
 */

import { SudoRPCExecutionPlanStep } from "./declare";

export class SudoRPCProcessStatus<Metadata, Payload, SuccessResult, FailResult> {

    public static create<Metadata, Payload, SuccessResult, FailResult>():
        SudoRPCProcessStatus<Metadata, Payload, SuccessResult, FailResult> {

        return new SudoRPCProcessStatus();
    }

    private readonly _steps: Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>>;

    private readonly _fulfilledDependencies: Set<string>;

    private constructor() {

        this._steps = [];

        this._fulfilledDependencies = new Set();
    }
}
