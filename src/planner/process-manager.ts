/**
 * @author WMXPY
 * @namespace Planner
 * @description Process Manager
 */

import { AvailableResource } from "./declare";

export class SudoRPCPlannerProcessManager<Metadata, Payload, SuccessResult, FailResult> {

    public static create<Metadata, Payload, SuccessResult, FailResult>(
        resources: Map<string, AvailableResource<Metadata, Payload, SuccessResult, FailResult>>,
        satisfies: Map<string, Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>>>,
    ): SudoRPCPlannerProcessManager<Metadata, Payload, SuccessResult, FailResult> {

        return new SudoRPCPlannerProcessManager<Metadata, Payload, SuccessResult, FailResult>(
            resources,
            satisfies,
        );
    }

    private readonly _resources: Map<string, AvailableResource<Metadata, Payload, SuccessResult, FailResult>>;
    private readonly _satisfies: Map<string, Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>>>;

    private readonly _satisfied: Set<string>;
    private readonly _executed: Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>>;

    private constructor(
        resources: Map<string, AvailableResource<Metadata, Payload, SuccessResult, FailResult>>,
        satisfies: Map<string, Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>>>,
    ) {

        this._resources = resources;
        this._satisfies = satisfies;

        this._satisfied = new Set<string>();
        this._executed = new Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>>();
    }

    public canExecute(
        resource: AvailableResource<Metadata, Payload, SuccessResult, FailResult>,
    ): boolean {

        if (this._executed.has(resource)) {
            return false;
        }

        for (const satisfy of resource.satisfies) {

            if (!this._satisfies.has(satisfy)) {
                return false;
            }

            const satisfyResources: Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>> = this._satisfies.get(satisfy)!;

            if (satisfyResources.size === 0) {
                return false;
            }

            for (const satisfyResource of satisfyResources) {

                for (const neededDependency of satisfyResource.dependencies) {

                    if (!this._satisfied.has(neededDependency)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    public markExecuted(
        resource: AvailableResource<Metadata, Payload, SuccessResult, FailResult>,
    ): void {

        this._executed.add(resource);

        for (const satisfy of resource.satisfies) {
            this._satisfied.add(satisfy);
        }
    }
}
