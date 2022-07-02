/**
 * @author WMXPY
 * @namespace Planner
 * @description Process Medium
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { FulfillDependencySymbolResult, PROCESS_MEDIUM_INFINITY_LOOP_SYMBOL, SudoRPCExecutionPlanStep, SudoRPCProcessMedium } from "../../../src";
import { infinityLoopSatisfies, infinityLoopSatisfiesRoot } from "../../mock/dependencies/infinity-loop-satisfies";
import { multipleOptionsSatisfies, multipleOptionsSatisfiesRoot } from "../../mock/dependencies/multiple-options";
import { simpleSatisfies, simpleSatisfiesRoot } from "../../mock/dependencies/simple-satisfies";
import { twoResourcesNeedOneSatisfies, twoResourcesNeedOneSatisfiesRoot } from "../../mock/dependencies/two-resource-need-one-satisfies";
import { twoResourcesNeedOneSatisfiesChain, twoResourcesNeedOneSatisfiesChainRoot } from "../../mock/dependencies/two-resource-need-one-satisfies-chain";

describe('Given {SudoRPCProcessMedium} Class', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('planner-process-medium');

    it('should be able to construct', (): void => {

        const processMedium = SudoRPCProcessMedium.create(new Map());

        expect(processMedium).to.be.instanceOf(SudoRPCProcessMedium);
    });

    it('should be able to resolve simple dependencies', (): void => {

        const processMedium = SudoRPCProcessMedium.create(simpleSatisfies);
        const result: FulfillDependencySymbolResult = processMedium.fulfill(simpleSatisfiesRoot);

        const steps: Array<SudoRPCExecutionPlanStep<any, any, any, any>> = processMedium.steps;

        expect(result.success).to.be.true;
        expect(steps).to.has.lengthOf(2);
    });

    it('should be able to resolve simple dependencies twice', (): void => {

        const processMedium = SudoRPCProcessMedium.create(simpleSatisfies);
        const result1: FulfillDependencySymbolResult = processMedium.fulfill(simpleSatisfiesRoot);
        const result2: FulfillDependencySymbolResult = processMedium.fulfill(simpleSatisfiesRoot);

        const steps: Array<SudoRPCExecutionPlanStep<any, any, any, any>> = processMedium.steps;

        expect(result1.success).to.be.true;
        expect(result2.success).to.be.true;
        expect(steps).to.has.lengthOf(2);
    });

    it('should be able to resolve two resources need one dependencies', (): void => {

        const processMedium = SudoRPCProcessMedium.create(twoResourcesNeedOneSatisfies);
        const result: FulfillDependencySymbolResult = processMedium.fulfill(twoResourcesNeedOneSatisfiesRoot);

        const steps: Array<SudoRPCExecutionPlanStep<any, any, any, any>> = processMedium.steps;

        expect(result.success).to.be.true;
        expect(steps).to.has.lengthOf(3);
    });

    it('should be able to resolve two resources need one dependencies chain', (): void => {

        const processMedium = SudoRPCProcessMedium.create(twoResourcesNeedOneSatisfiesChain);
        const result: FulfillDependencySymbolResult = processMedium.fulfill(twoResourcesNeedOneSatisfiesChainRoot);

        const steps: Array<SudoRPCExecutionPlanStep<any, any, any, any>> = processMedium.steps;

        expect(result.success).to.be.true;
        expect(steps).to.has.lengthOf(6);
    });

    it('should be able to pickup best option from options', (): void => {

        const processMedium = SudoRPCProcessMedium.create(multipleOptionsSatisfies);
        const result: FulfillDependencySymbolResult = processMedium.fulfill(multipleOptionsSatisfiesRoot);

        const steps: Array<SudoRPCExecutionPlanStep<any, any, any, any>> = processMedium.steps;

        console.log(steps);

        expect(result.success).to.be.true;
        expect(steps).to.has.lengthOf(6);
    });

    it('should be able to reject infinity loop dependencies', (): void => {

        const processMedium = SudoRPCProcessMedium.create(infinityLoopSatisfies);
        const result: FulfillDependencySymbolResult = processMedium.fulfill(infinityLoopSatisfiesRoot);

        expect(result).to.be.deep.equal({

            success: false,
            result: PROCESS_MEDIUM_INFINITY_LOOP_SYMBOL,
            payload: {
                dependency: 'dep1',
            },
        });
    });
});
