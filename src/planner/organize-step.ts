/**
 * @author WMXPY
 * @namespace Planner
 * @description Organize Step
 */

import { SudoRPCExecutionPlanStep } from "./declare";

export const sudoRPCNoParallelOrganizeSteps = <Metadata, Payload, SuccessResult, FailResult>(
    steps: Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>>,
): Array<Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>>> => {

    const result: Array<Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>>> = [];
    for (const step of steps) {
        result.push([step]);
    }

    return result;
};

export const sudoRPCOrganizeSteps = <Metadata, Payload, SuccessResult, FailResult>(
    steps: Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>>,
): Array<Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>>> => {

    const result: Array<Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>>> = [];

    const resolvedDependencies: string[] = [];
    let currentSteps: Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>> = steps;

    const iteration = () => {

        const iterationSteps: Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>> = [];
        const nextSteps: Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>> = [];

        step: for (const step of currentSteps) {

            const dependencies: string[] = step.resource.dependencies;
            for (const dependency of dependencies) {

                if (!resolvedDependencies.includes(dependency)) {
                    nextSteps.push(step);
                    continue step;
                }
            }

            iterationSteps.push(step);
        }

        if (iterationSteps.length === 0) {
            throw new Error('Failed to organize steps');
        }

        result.push(iterationSteps);
        currentSteps = nextSteps;

        for (const step of iterationSteps) {
            resolvedDependencies.push(...step.resource.satisfies);
        }
    };

    while (currentSteps.length > 0) {
        iteration();
    }

    return result;
};
