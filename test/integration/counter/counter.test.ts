/**
 * @author WMXPY
 * @namespace Counter
 * @description Counter
 * @override Integration Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { SudoRPCCallManager } from "../../../src";
import { MockLocalCallProxy } from "../../mock/proxy/local-call";
import { createCounterService } from "../../mock/service/counter";

describe('Given (Counter) Integration Test Scenario', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('counter-counter');

    let callManager: SudoRPCCallManager<any, any, any, any> = undefined as any;

    beforeEach((): void => {
        callManager = SudoRPCCallManager.create(
            MockLocalCallProxy.create(createCounterService()),
        );
        callManager.ignite();
    });

    afterEach((): void => {
        callManager.dialDown();
    });

    it('should be able to execute increment', async (): Promise<void> => {

        const first: number = chance.integer();
        const second: number = chance.integer();

        const result: any = await callManager.makeCall("increment", {}, {
            first,
            second,
        });

        expect(result).to.be.equal(first + second);
    });
});
