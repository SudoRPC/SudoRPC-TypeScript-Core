/**
 * @author WMXPY
 * @namespace Planner
 * @description Organize Steps
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { FulfillDependencySymbolResult, PROCESS_MEDIUM_INFINITY_LOOP_SYMBOL, SudoRPCExecutionPlanStep, sudoRPCOrganizeSteps, SudoRPCProcessMedium } from "../../../src";
import { infinityLoopSatisfies, infinityLoopSatisfiesRoot } from "../../mock/dependencies/infinity-loop-satisfies";
import { simpleSatisfies, simpleSatisfiesRoot } from "../../mock/dependencies/simple-satisfies";
import { twoResourcesNeedOneSatisfies, twoResourcesNeedOneSatisfiesRoot } from "../../mock/dependencies/two-resource-need-one-satisfies";
import { twoResourcesNeedOneSatisfiesChain, twoResourcesNeedOneSatisfiesChainRoot } from "../../mock/dependencies/two-resource-need-one-satisfies-chain";

describe('Given [Organize-Steps] Helper Functions', (): void => {

    const chance: Chance.Chance = new Chance('planner-organize-steps');

    it('should be able to organize simple dependencies', (): void => {

        const processMedium = SudoRPCProcessMedium.create(simpleSatisfies);
        const result: FulfillDependencySymbolResult = processMedium.fulfill(simpleSatisfiesRoot);

        const steps: Array<SudoRPCExecutionPlanStep<any, any, any, any>> = processMedium.steps;
        const organizedSteps: Array<Array<SudoRPCExecutionPlanStep<any, any, any, any>>> = sudoRPCOrganizeSteps(steps);

        expect(result.succeed).to.be.true;
        expect(organizedSteps).to.has.lengthOf(2);
        expect(organizedSteps[0]).to.has.lengthOf(1);
        expect(organizedSteps[1]).to.has.lengthOf(1);
    });

    it('should be able to organize two resources need one dependencies', (): void => {

        const processMedium = SudoRPCProcessMedium.create(twoResourcesNeedOneSatisfies);
        const result: FulfillDependencySymbolResult = processMedium.fulfill(twoResourcesNeedOneSatisfiesRoot);

        const steps: Array<SudoRPCExecutionPlanStep<any, any, any, any>> = processMedium.steps;
        const organizedSteps: Array<Array<SudoRPCExecutionPlanStep<any, any, any, any>>> = sudoRPCOrganizeSteps(steps);

        expect(result.succeed).to.be.true;
        expect(organizedSteps).to.has.lengthOf(2);
        expect(organizedSteps[0]).to.has.lengthOf(2);
        expect(organizedSteps[1]).to.has.lengthOf(1);
    });

    it('should be able to organize two resources need one dependencies chain', (): void => {

        const processMedium = SudoRPCProcessMedium.create(twoResourcesNeedOneSatisfiesChain);
        const result: FulfillDependencySymbolResult = processMedium.fulfill(twoResourcesNeedOneSatisfiesChainRoot);

        const steps: Array<SudoRPCExecutionPlanStep<any, any, any, any>> = processMedium.steps;
        const organizedSteps: Array<Array<SudoRPCExecutionPlanStep<any, any, any, any>>> = sudoRPCOrganizeSteps(steps);

        expect(result.succeed).to.be.true;
        expect(organizedSteps).to.has.lengthOf(4);
        expect(organizedSteps[0]).to.has.lengthOf(2);
        expect(organizedSteps[1]).to.has.lengthOf(1);
        expect(organizedSteps[2]).to.has.lengthOf(1);
        expect(organizedSteps[3]).to.has.lengthOf(1);
    });
});
