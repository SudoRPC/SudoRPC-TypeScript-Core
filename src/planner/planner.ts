/**
 * @author WMXPY
 * @namespace Planner
 * @description Planner
 */

import { SudoRPCCall } from "../structure/call";
import { AvailableResource, SudoRPCExecutionPlan } from "./declare";

export class SudoRPCPlanner<Metadata, Payload, SuccessResult, FailResult> {

    public static create<Metadata, Payload, SuccessResult, FailResult>():
        SudoRPCPlanner<Metadata, Payload, SuccessResult, FailResult> {

        return new SudoRPCPlanner<Metadata, Payload, SuccessResult, FailResult>();
    }

    private readonly _resources: Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>>;
    private readonly _satisfies: Map<string, WeakSet<AvailableResource<Metadata, Payload, SuccessResult, FailResult>>>;

    private constructor() {

        this._resources = new Set();
        this._satisfies = new Map();
    }

    public register(
        resource: AvailableResource<Metadata, Payload, SuccessResult, FailResult>,
    ): void {

        this._resources.add(resource);
        for (const satisfy of resource.satisfies) {

            if (!this._satisfies.has(satisfy)) {
                this._satisfies.set(satisfy, new WeakSet());
            }
            this._satisfies.get(satisfy)!.add(resource);
        }
    }

    public plan(call: SudoRPCCall<Metadata, Payload>): SudoRPCExecutionPlan<Metadata, Payload, SuccessResult, FailResult> {

        return null as any;
    }
}
