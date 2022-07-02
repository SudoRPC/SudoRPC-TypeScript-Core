/**
 * @author WMXPY
 * @namespace Planner
 * @description Process Medium
 */

import { AvailableResource, SudoRPCExecutionPlanStep, SUDORPC_PLAN_EXECUTE_STEP_REASON } from "./declare";
import { SudoRPCProcessStatus } from "./process-status";

export const PROCESS_MEDIUM_DEPENDENCY_NOT_FOUND_SYMBOL = Symbol('dependency-not-found');
export const PROCESS_MEDIUM_INFINITY_LOOP_SYMBOL = Symbol('infinity-loop');
export const PROCESS_MEDIUM_RESOURCE_NOT_FOUND_SYMBOL = Symbol('resource-not-found');
export const PROCESS_MEDIUM_UNKNOWN_SYMBOL = Symbol('unknown');

export type FulfillDependencySymbolResult = {

    readonly success: true;

    readonly status: SudoRPCProcessStatus<any, any, any, any>;
} | {

    readonly success: false;

    readonly result:
    | typeof PROCESS_MEDIUM_DEPENDENCY_NOT_FOUND_SYMBOL
    | typeof PROCESS_MEDIUM_INFINITY_LOOP_SYMBOL
    | typeof PROCESS_MEDIUM_RESOURCE_NOT_FOUND_SYMBOL
    | typeof PROCESS_MEDIUM_UNKNOWN_SYMBOL;

    readonly payload: Record<string, any>;
};

export class SudoRPCProcessMedium<Metadata, Payload, SuccessResult, FailResult> {

    public static create<Metadata, Payload, SuccessResult, FailResult>(
        satisfies: Map<string, Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>>>,
    ): SudoRPCProcessMedium<Metadata, Payload, SuccessResult, FailResult> {

        return new SudoRPCProcessMedium(satisfies);
    }

    private readonly _satisfies: Map<string, Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>>>;

    private constructor(
        satisfies: Map<string, Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>>>,
    ) {

        this._satisfies = satisfies;
    }

    public fulfill(
        resource: AvailableResource<Metadata, Payload, SuccessResult, FailResult>,
    ): FulfillDependencySymbolResult {

        const status: SudoRPCProcessStatus<Metadata, Payload, SuccessResult, FailResult> =
            SudoRPCProcessStatus.create(resource);

        const dependencies: string[] = resource.dependencies;
        const dependencySteps: SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>[] = [];

        for (const dependency of dependencies) {

            const result: FulfillDependencySymbolResult = this._fulfillDependency(
                dependency,
                status,
            );

            if (!result.success) {
                return result;
            }

            dependencySteps.push(...result.status.steps);
        }

        status.addStepList(dependencySteps);

        return {
            success: true,
            status,
        };
    }

    private _fulfillDependency(
        dependency: string,
        previousStatus: SudoRPCProcessStatus<Metadata, Payload, SuccessResult, FailResult>,
    ): FulfillDependencySymbolResult {

        const status: SudoRPCProcessStatus<Metadata, Payload, SuccessResult, FailResult> =
            previousStatus.clone();

        if (!this._satisfies.has(dependency)) {

            return {
                success: false,
                result: PROCESS_MEDIUM_DEPENDENCY_NOT_FOUND_SYMBOL,
                payload: {
                    dependency,
                },
            };
        }

        if (status.isDependencyFulfilled(dependency)) {

            return {
                success: true,
                status,
            };
        }

        const possibleFulfills: Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>> =
            this._satisfies.get(dependency) as Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>>;

        const erroredOptions: FulfillDependencySymbolResult[] = [];

        const possibleStatuses: SudoRPCProcessStatus<Metadata, Payload, SuccessResult, FailResult>[] = [];

        possibleLoop: for (const possibleFulfill of possibleFulfills) {

            const possibleStatus: SudoRPCProcessStatus<Metadata, Payload, SuccessResult, FailResult> =
                status.clone();

            const dependencySteps: SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>[] = [];

            if (possibleStatus.isResourceVisited(possibleFulfill)) {

                erroredOptions.push({
                    success: false,
                    result: PROCESS_MEDIUM_INFINITY_LOOP_SYMBOL,
                    payload: {
                        dependency,
                    },
                });
                continue possibleLoop;
            }
            possibleStatus.addVisitedResource(possibleFulfill);

            if (!this._canExecute(possibleFulfill, possibleStatus)) {

                const dependencies: string[] = possibleFulfill.dependencies;
                for (const eachDependency of dependencies) {

                    const result: FulfillDependencySymbolResult = this._fulfillDependency(
                        eachDependency,
                        possibleStatus.cloneWithoutSteps(),
                    );

                    if (!result.success) {

                        erroredOptions.push(result);
                        continue possibleLoop;
                    }

                    dependencySteps.push(...result.status.steps);
                    possibleStatus.addFulfilledDependencyList(
                        [...result.status.fulfilledDependencies],
                    );
                }
            }

            possibleStatus.addStepList(dependencySteps);

            possibleStatus.addFulfilledDependency(dependency);

            possibleStatus.addStep({
                reason: SUDORPC_PLAN_EXECUTE_STEP_REASON.DEPENDENCY,
                dependencyOf: dependency,
                resource: possibleFulfill,
            });

            possibleStatuses.push(possibleStatus);
            continue possibleLoop;
        }

        if (possibleStatuses.length !== 0) {

            const bestOption: SudoRPCProcessStatus<Metadata, Payload, SuccessResult, FailResult> =
                possibleStatuses.reduce((previous: SudoRPCProcessStatus<Metadata, Payload, SuccessResult, FailResult>, current: SudoRPCProcessStatus<Metadata, Payload, SuccessResult, FailResult>) => {

                    if (previous.steps.length < current.steps.length) {
                        return previous;
                    }
                    return current;
                });

            return {
                success: true,
                status: bestOption,
            };
        }

        if (erroredOptions.length !== 0) {
            return erroredOptions[0];
        }

        return {
            success: false,
            result: PROCESS_MEDIUM_UNKNOWN_SYMBOL,
            payload: {
                dependency,
            },
        };
    }

    private _canExecute(
        resource: AvailableResource<Metadata, Payload, SuccessResult, FailResult>,
        status: SudoRPCProcessStatus<Metadata, Payload, SuccessResult, FailResult>,
    ): boolean {

        for (const dependency of resource.dependencies) {

            if (!status.isDependencyFulfilled(dependency)) {
                return false;
            }
        }

        return true;
    }
}
