/**
 * @author WMXPY
 * @namespace Planner
 * @description Process Medium
 */

import { AvailableResource, SudoRPCExecutionPlanStep, SUDORPC_PLAN_EXECUTE_STEP_REASON } from "./declare";

export class SudoRPCProcessMedium<Metadata, Payload, SuccessResult, FailResult> {

    public static create<Metadata, Payload, SuccessResult, FailResult>(
        satisfies: Map<string, Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>>>,
    ): SudoRPCProcessMedium<Metadata, Payload, SuccessResult, FailResult> {

        return new SudoRPCProcessMedium(satisfies);
    }

    private readonly _satisfies: Map<string, Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>>>;

    private readonly _steps: SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>[];

    private readonly _fulfilledDependencies: Set<string>;

    private constructor(
        satisfies: Map<string, Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>>>,
    ) {

        this._satisfies = satisfies;

        this._steps = [];

        this._fulfilledDependencies = new Set();
    }

    public get steps(): SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>[] {
        return this._steps;
    }

    public fulfill(resource: AvailableResource<Metadata, Payload, SuccessResult, FailResult>): void {

        const dependencies: string[] = resource.dependencies;
        for (const dependency of dependencies) {
            this._fulfillDependency(dependency);
        }
    }

    private _fulfillDependency(dependency: string): boolean {

        if (!this._satisfies.has(dependency)) {
            return false;
        }

        const possibleFulfills: Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>> = this._satisfies.get(dependency)!;
        for (const possibleFulfill of possibleFulfills) {

            if (!this._canExecute(possibleFulfill)) {

                const dependencies: string[] = possibleFulfill.dependencies;
                for (const dependency of dependencies) {

                    if (!this._fulfillDependency(dependency)) {
                        return false;
                    }
                }
            }

            this._fulfilledDependencies.add(dependency);

            this._steps.push({
                reason: SUDORPC_PLAN_EXECUTE_STEP_REASON.DEPENDENCY,
                dependencyOf: dependency,
                resource: possibleFulfill,
            });

            return true;
        }
        return false;
    }

    private _canExecute(resource: AvailableResource<Metadata, Payload, SuccessResult, FailResult>): boolean {

        for (const dependency of resource.dependencies) {

            if (!this._fulfilledDependencies.has(dependency)) {
                return false;
            }
        }

        return true;
    }
}
