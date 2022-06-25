/**
 * @author WMXPY
 * @namespace Planner
 * @description Planner
 */

import { SudoRPCCall } from "../structure/call";
import { AvailableResource, SudoRPCExecutionPlan, SudoRPCExecutionPlanStep, SUDORPC_EXECUTE_PLAN_NOT_SATISFIED_REASON } from "./declare";
import { SudoRPCPlannerProcessManager } from "./process-manager";

export class SudoRPCPlanner<Metadata, Payload, SuccessResult, FailResult> {

    public static create<Metadata, Payload, SuccessResult, FailResult>():
        SudoRPCPlanner<Metadata, Payload, SuccessResult, FailResult> {

        return new SudoRPCPlanner<Metadata, Payload, SuccessResult, FailResult>();
    }

    private readonly _resources: Map<string, AvailableResource<Metadata, Payload, SuccessResult, FailResult>>;
    private readonly _satisfies: Map<string, Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>>>;

    private constructor() {

        this._resources = new Map();
        this._satisfies = new Map();
    }

    public register(
        resource: AvailableResource<Metadata, Payload, SuccessResult, FailResult>,
    ): void {

        this._resources.set(resource.resourceName, resource);
        for (const satisfy of resource.satisfies) {

            if (!this._satisfies.has(satisfy)) {
                this._satisfies.set(satisfy, new Set());
            }
            this._satisfies.get(satisfy)!.add(resource);
        }
    }

    public plan(call: SudoRPCCall<Metadata, Payload>): SudoRPCExecutionPlan<Metadata, Payload, SuccessResult, FailResult> {

        const targetResource: string = call.resource;

        if (!this._resources.has(targetResource)) {
            return {
                satisfiable: false,
                reason: SUDORPC_EXECUTE_PLAN_NOT_SATISFIED_REASON.RESOURCE_NOT_FOUND,
                resource: targetResource,
            };
        }

        const processManager: SudoRPCPlannerProcessManager<Metadata, Payload, SuccessResult, FailResult> = SudoRPCPlannerProcessManager.create(
            this._resources,
            this._satisfies,
        );




        return null as any;
    }

    private _findDependencySteps(
        dependencies: string[],
        satisfies: string[] = [],
        steps: SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>[] = [],
    ): SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>[] {

        for (const dependency of dependencies) {

            if (!this._satisfies.has(dependency)) {

            }
        }

        return [];
    }
}
