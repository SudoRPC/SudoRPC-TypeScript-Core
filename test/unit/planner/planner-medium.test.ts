/**
 * @author WMXPY
 * @namespace Planner
 * @description Process Medium
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { SudoRPCProcessMedium } from "../../../src";

describe('Given {SudoRPCProcessMedium} Class', (): void => {

    const chance: Chance.Chance = new Chance('planner-process-medium');

    it('should be able to construct', (): void => {

        const processMedium = SudoRPCProcessMedium.create(new Map());

        expect(processMedium).to.be.instanceOf(SudoRPCProcessMedium);
    });
});
