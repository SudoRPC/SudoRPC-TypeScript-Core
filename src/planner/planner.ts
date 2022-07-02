/**
 * @author WMXPY
 * @namespace Planner
 * @description Planner
 */

import { RESOURCE_TYPE_SYMBOL, RESOURCE_TYPE } from "../resource/declare";
import { SudoRPCEndpointResource } from "../resource/endpoint-resource";
import { SudoRPCCall } from "../structure/call";
import { AvailableResource, SudoRPCExecutionPlan, SudoRPCExecutionPlanStep, SUDORPC_EXECUTE_PLAN_NOT_SATISFIED_REASON, SUDORPC_PLAN_EXECUTE_STEP_REASON } from "./declare";
import { FulfillDependencySymbolResult, PROCESS_MEDIUM_DEPENDENCY_NOT_FOUND_SYMBOL, PROCESS_MEDIUM_INFINITY_LOOP_SYMBOL, PROCESS_MEDIUM_RESOURCE_NOT_FOUND_SYMBOL, SudoRPCProcessMedium } from "./process-medium";

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

    public planCall(
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

        if (targetResource[RESOURCE_TYPE_SYMBOL] !== RESOURCE_TYPE.ENDPOINT) {

            return {
                satisfiable: false,
                reason: SUDORPC_EXECUTE_PLAN_NOT_SATISFIED_REASON.CANNOT_CALL_NOT_ENDPOINT_RESOURCE,
                resource: targetResourceName,
            };
        }

        const assertedResource: SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult> =
            targetResource as SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult>;

        return {
            satisfiable: true,
            steps: [{
                reason: SUDORPC_PLAN_EXECUTE_STEP_REASON.CALL,
                resource: assertedResource,
            }],
        };
    }

    public planDependencies(
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

            const steps: Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>> = medium.steps;

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
                    dependency: result.payload.dependency,
                };
            }
            case PROCESS_MEDIUM_INFINITY_LOOP_SYMBOL: {

                return {
                    satisfiable: false,
                    reason: SUDORPC_EXECUTE_PLAN_NOT_SATISFIED_REASON.DEPENDENCY_INFINITE_LOOP,
                    dependency: result.payload.dependency,
                };
            }
            case PROCESS_MEDIUM_RESOURCE_NOT_FOUND_SYMBOL: {

                return {
                    satisfiable: false,
                    reason: SUDORPC_EXECUTE_PLAN_NOT_SATISFIED_REASON.RESOURCE_NOT_FOUND,
                    resource: result.payload.resource,
                };
            }
        }

        return {
            satisfiable: false,
            reason: SUDORPC_EXECUTE_PLAN_NOT_SATISFIED_REASON.UNKNOWN,
        };
    }
}
