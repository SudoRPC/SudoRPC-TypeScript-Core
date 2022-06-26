/**
 * @author WMXPY
 * @namespace Planner
 * @description Planner
 */

import { SudoRPCCall } from "../structure/call";
import { sudoRPCAppendCallStep } from "./append-step";
import { AvailableResource, SudoRPCExecutionPlan, SudoRPCExecutionPlanStep, SUDORPC_EXECUTE_PLAN_NOT_SATISFIED_REASON } from "./declare";
import { FulfillDependencySymbolResult, PROCESS_MEDIUM_DEPENDENCY_NOT_FOUND_SYMBOL, SudoRPCProcessMedium } from "./process-medium";

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
    ): this {

        this._resources.set(resource.resourceName, resource);
        for (const satisfy of resource.satisfies) {

            if (!this._satisfies.has(satisfy)) {
                this._satisfies.set(satisfy, new Set());
            }

            const satisfyGroup: Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>> =
                this._satisfies.get(satisfy) as Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>>;
            satisfyGroup.add(resource);
        }

        return this;
    }

    public plan(
        call: SudoRPCCall<Metadata, Payload>,
    ): SudoRPCExecutionPlan<Metadata, Payload, SuccessResult, FailResult> {

        const targetResourceName: string = call.resource;

        if (!this._resources.has(targetResourceName)) {
            return {
                satisfiable: false,
                reason: SUDORPC_EXECUTE_PLAN_NOT_SATISFIED_REASON.RESOURCE_NOT_FOUND,
                resource: targetResourceName,
            };
        }

        const targetResource: AvailableResource<Metadata, Payload, SuccessResult, FailResult> =
            this._resources.get(targetResourceName) as AvailableResource<Metadata, Payload, SuccessResult, FailResult>;

        const medium: SudoRPCProcessMedium<Metadata, Payload, SuccessResult, FailResult> = SudoRPCProcessMedium.create(this._satisfies);

        const result: FulfillDependencySymbolResult = medium.fulfill(targetResource);

        if (result.success) {

            const steps: Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>> = sudoRPCAppendCallStep(
                medium.steps,
                targetResource,
            );

            return {
                satisfiable: true,
                steps,
            };
        }

        switch (result.result) {

            case PROCESS_MEDIUM_DEPENDENCY_NOT_FOUND_SYMBOL: {

                return {
                    satisfiable: false,
                    reason: SUDORPC_EXECUTE_PLAN_NOT_SATISFIED_REASON.DEPENDENCY_NOT_FOUND,
                    dependency: '',
                };
            }
        }

        return {
            satisfiable: false,
            reason: SUDORPC_EXECUTE_PLAN_NOT_SATISFIED_REASON.UNKNOWN,
        };
    }
}
