/**
 * @author WMXPY
 * @namespace Planner
 * @description Process Medium
 */

import { AvailableResource, SudoRPCExecutionPlanStep, SUDORPC_PLAN_EXECUTE_STEP_REASON } from "./declare";

export const PROCESS_MEDIUM_DEPENDENCY_NOT_FOUND_SYMBOL = Symbol('dependency-not-found');
export const PROCESS_MEDIUM_INFINITY_LOOP_SYMBOL = Symbol('infinity-loop');
export const PROCESS_MEDIUM_RESOURCE_NOT_FOUND_SYMBOL = Symbol('resource-not-found');

export const PROCESS_MEDIUM_SUCCEED_SYMBOL = Symbol('succeed');

export type FulfillDependencySymbolResult =
    | typeof PROCESS_MEDIUM_DEPENDENCY_NOT_FOUND_SYMBOL
    | typeof PROCESS_MEDIUM_INFINITY_LOOP_SYMBOL
    | typeof PROCESS_MEDIUM_RESOURCE_NOT_FOUND_SYMBOL
    | typeof PROCESS_MEDIUM_SUCCEED_SYMBOL;

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

    public fulfill(resource: AvailableResource<Metadata, Payload, SuccessResult, FailResult>): FulfillDependencySymbolResult {

        const visitedResources: Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>> = new Set();
        visitedResources.add(resource);

        const dependencies: string[] = resource.dependencies;
        for (const dependency of dependencies) {

            const result: FulfillDependencySymbolResult = this._fulfillDependency(dependency, visitedResources);
            if (result !== PROCESS_MEDIUM_SUCCEED_SYMBOL) {
                return result;
            }
        }
        return PROCESS_MEDIUM_SUCCEED_SYMBOL;
    }

    private _fulfillDependency(
        dependency: string,
        visitedResources: Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>>,
    ): FulfillDependencySymbolResult {

        if (!this._satisfies.has(dependency)) {
            return PROCESS_MEDIUM_DEPENDENCY_NOT_FOUND_SYMBOL;
        }

        if (this._fulfilledDependencies.has(dependency)) {
            return PROCESS_MEDIUM_SUCCEED_SYMBOL;
        }

        const possibleFulfills: Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>> = this._satisfies.get(dependency)!;
        for (const possibleFulfill of possibleFulfills) {

            if (visitedResources.has(possibleFulfill)) {
                continue;
            }
            visitedResources.add(possibleFulfill);

            if (!this._canExecute(possibleFulfill)) {

                const dependencies: string[] = possibleFulfill.dependencies;
                for (const dependency of dependencies) {

                    const result: FulfillDependencySymbolResult = this._fulfillDependency(dependency, visitedResources);
                    if (result !== PROCESS_MEDIUM_SUCCEED_SYMBOL) {
                        return result;
                    }
                }
            }

            this._fulfilledDependencies.add(dependency);

            this._steps.push({
                reason: SUDORPC_PLAN_EXECUTE_STEP_REASON.DEPENDENCY,
                dependencyOf: dependency,
                resource: possibleFulfill,
            });

            return PROCESS_MEDIUM_SUCCEED_SYMBOL;
        }
        return PROCESS_MEDIUM_INFINITY_LOOP_SYMBOL;
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
