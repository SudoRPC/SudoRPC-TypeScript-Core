/**
 * @author WMXPY
 * @namespace Resource
 * @description Endpoint Resource
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { SudoRPCEndpointResource } from "../../../src";

describe('Given {SudoRPCEndpointResource} Class', (): void => {

    const chance: Chance.Chance = new Chance('resource-endpoint-resource');

    it('should be able to construct', (): void => {

        const resource = SudoRPCEndpointResource.createExposed(chance.string(), null as any);

        expect(resource).to.be.instanceOf(SudoRPCEndpointResource);
    });
});
