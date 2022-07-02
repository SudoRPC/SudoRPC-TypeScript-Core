/**
 * @author WMXPY
 * @namespace Planner
 * @description Process Status
 */

import { AvailableResource, SudoRPCExecutionPlanStep } from "./declare";

export class SudoRPCProcessStatus<Metadata, Payload, SuccessResult, FailResult> {

    public static create<Metadata, Payload, SuccessResult, FailResult>(
        initialResource?: AvailableResource<Metadata, Payload, SuccessResult, FailResult>,
    ): SudoRPCProcessStatus<Metadata, Payload, SuccessResult, FailResult> {

        return new SudoRPCProcessStatus(
            initialResource,
        );
    }

    private _steps: Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>>;

    private _fulfilledDependencies: Set<string>;
    private _visitedResources: Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>>;

    private constructor(
        initialResource?: AvailableResource<Metadata, Payload, SuccessResult, FailResult>,
    ) {

        this._steps = [];

        this._fulfilledDependencies = new Set();

        if (typeof initialResource === 'undefined') {
            this._visitedResources = new Set();
        } else {
            this._visitedResources = new Set([initialResource]);
        }
    }

    public get steps(): Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>> {
        return this._steps;
    }

    public get fulfilledDependencies(): Set<string> {
        return this._fulfilledDependencies;
    }

    public get visitedResources(): Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>> {
        return this._visitedResources;
    }

    public addStep(step: SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>): void {

        this._steps.push(step);
    }

    public addStepList(steps: Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>>): void {

        this._steps.push(...steps);
    }

    public isDependencyFulfilled(dependency: string): boolean {

        return this._fulfilledDependencies.has(dependency);
    }

    public addFulfilledDependency(dependency: string): void {

        this._fulfilledDependencies.add(dependency);
    }

    public addFulfilledDependencyList(dependencies: string[]): void {

        for (const dependency of dependencies) {
            this._fulfilledDependencies.add(dependency);
        }
    }

    public isResourceVisited(resource: AvailableResource<Metadata, Payload, SuccessResult, FailResult>): boolean {

        return this._visitedResources.has(resource);
    }

    public addVisitedResource(resource: AvailableResource<Metadata, Payload, SuccessResult, FailResult>): void {

        this._visitedResources.add(resource);
    }

    public clone(): SudoRPCProcessStatus<Metadata, Payload, SuccessResult, FailResult> {

        const cloned: SudoRPCProcessStatus<Metadata, Payload, SuccessResult, FailResult> =
            SudoRPCProcessStatus.create();

        cloned._steps = this._steps.slice();
        cloned._fulfilledDependencies = new Set([...this._fulfilledDependencies]);
        cloned._visitedResources = new Set([...this._visitedResources]);

        return cloned;
    }

    public cloneWithoutSteps(): SudoRPCProcessStatus<Metadata, Payload, SuccessResult, FailResult> {

        const cloned: SudoRPCProcessStatus<Metadata, Payload, SuccessResult, FailResult> =
            SudoRPCProcessStatus.create();

        cloned._fulfilledDependencies = new Set([...this._fulfilledDependencies]);
        cloned._visitedResources = new Set([...this._visitedResources]);

        return cloned;
    }
}
