/**
 * @author WMXPY
 * @namespace Resource
 * @description Resource
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { SudoRPCResource } from "../../../src";

describe('Given {SudoRPCResource} Class', (): void => {

    const chance: Chance.Chance = new Chance('resource-resource');

    it('should be able to construct', (): void => {

        const resource: SudoRPCResource = SudoRPCResource.create(chance.string());

        expect(resource).to.be.instanceOf(SudoRPCResource);
    });
});
