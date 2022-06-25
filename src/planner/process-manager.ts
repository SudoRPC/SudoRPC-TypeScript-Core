/**
 * @author WMXPY
 * @namespace Planner
 * @description Process Manager
 */

import { AvailableResource } from "./declare";

export class SudoRPCPlannerProcessManager<Metadata, Payload, SuccessResult, FailResult> {

    private readonly _executed: Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>>

    private constructor() {

        this._executed = new Set();
    }
}
