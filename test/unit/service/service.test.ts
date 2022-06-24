/**
 * @author WMXPY
 * @namespace Service
 * @description Service
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { SudoRPCService } from "../../../src";

describe('Given {SudoRPCService} Class', (): void => {

    const chance: Chance.Chance = new Chance('service-service');

    it('should be able to construct', (): void => {

        const service: SudoRPCService = SudoRPCService.create();

        expect(service).to.be.instanceOf(SudoRPCService);
    });
});
