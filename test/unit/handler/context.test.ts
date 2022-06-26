/**
 * @author WMXPY
 * @namespace Handler
 * @description Context
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { SudoRPCHandlerContext } from "../../../src";

describe('Given {SudoRPCHandlerContext} Class', (): void => {

    const chance: Chance.Chance = new Chance('handler-context');

    it('should be able to construct', (): void => {

        const context: SudoRPCHandlerContext<any, any> =
            SudoRPCHandlerContext.create(null as any);

        expect(context).to.be.instanceOf(SudoRPCHandlerContext);
    });

    it('should be able to get and set default context', (): void => {

        const key: string = chance.string();
        const value: any = chance.string();

        const context: SudoRPCHandlerContext<any, any> =
            SudoRPCHandlerContext.create(null as any);
        context.setDefaultContext(key, value);

        const result: string = context.getDefaultContext(key);

        expect(result).to.be.equal(value);
    });

    it('should be able to get and set context', (): void => {

        const namespace: string = chance.string();
        const key: string = chance.string();
        const value: any = chance.string();

        const context: SudoRPCHandlerContext<any, any> =
            SudoRPCHandlerContext.create(null as any);
        context.setContext(namespace, key, value);

        const result: string = context.getContext(namespace, key);

        expect(result).to.be.equal(value);
    });
});
