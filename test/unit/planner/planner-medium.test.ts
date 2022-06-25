/**
 * @author WMXPY
 * @namespace Planner
 * @description Process Medium
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { SudoRPCExecutionPlanStep, SudoRPCProcessMedium } from "../../../src";
import { infinityLoopSatisfies, infinityLoopSatisfiesRoot } from "../../mock/dependencies/infinity-loop-satisfies";
import { simpleSatisfies, simpleSatisfiesRoot } from "../../mock/dependencies/simple-satisfies";
import { twoResourcesNeedOneSatisfies, twoResourcesNeedOneSatisfiesRoot } from "../../mock/dependencies/two-resource-need-one-satisfies";

describe('Given {SudoRPCProcessMedium} Class', (): void => {

    const chance: Chance.Chance = new Chance('planner-process-medium');

    it('should be able to construct', (): void => {

        const processMedium = SudoRPCProcessMedium.create(new Map());

        expect(processMedium).to.be.instanceOf(SudoRPCProcessMedium);
    });

    it('should be able to resolve simple dependencies', (): void => {

        const processMedium = SudoRPCProcessMedium.create(simpleSatisfies);
        const result: boolean = processMedium.fulfill(simpleSatisfiesRoot);

        const steps: SudoRPCExecutionPlanStep<any, any, any, any>[] = processMedium.steps;

        expect(result).to.be.true;
        expect(steps).to.has.lengthOf(2);
    });

    it('should be able to resolve simple dependencies twice', (): void => {

        const processMedium = SudoRPCProcessMedium.create(simpleSatisfies);
        const result1: boolean = processMedium.fulfill(simpleSatisfiesRoot);
        const result2: boolean = processMedium.fulfill(simpleSatisfiesRoot);

        const steps: SudoRPCExecutionPlanStep<any, any, any, any>[] = processMedium.steps;

        expect(result1).to.be.true;
        expect(result2).to.be.true;
        expect(steps).to.has.lengthOf(2);
    });

    it('should be able to resolve two resources need one dependencies', (): void => {

        const processMedium = SudoRPCProcessMedium.create(twoResourcesNeedOneSatisfies);
        const result: boolean = processMedium.fulfill(twoResourcesNeedOneSatisfiesRoot);

        const steps: SudoRPCExecutionPlanStep<any, any, any, any>[] = processMedium.steps;

        expect(result).to.be.true;
        expect(steps).to.has.lengthOf(3);
    });

    it('should be able to reject infinity loop dependencies', (): void => {

        const processMedium = SudoRPCProcessMedium.create(infinityLoopSatisfies);
        const result: boolean = processMedium.fulfill(infinityLoopSatisfiesRoot);

        const steps: SudoRPCExecutionPlanStep<any, any, any, any>[] = processMedium.steps;

        expect(result).to.be.true;
        expect(steps).to.has.lengthOf(3);
    });
});
