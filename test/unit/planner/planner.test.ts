/**
 * @author WMXPY
 * @namespace Planner
 * @description Planner
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { SudoRPCEndpointResource, SudoRPCExecutionPlan, SudoRPCMiddlewareResource, SudoRPCPlanner } from "../../../src";

describe('Given {SudoRPCPlanner} Class', (): void => {

    const chance: Chance.Chance = new Chance('planner-process-medium');

    it('should be able to construct', (): void => {

        const planner = SudoRPCPlanner.create();

        expect(planner).to.be.instanceOf(SudoRPCPlanner);
    });

    it('should be able to plan for multiple dependencies', (): void => {


        const simpleSatisfiesRoot = SudoRPCEndpointResource.createExposed('root', null as any);
        simpleSatisfiesRoot.addDependency('dep1');

        const dep1 = SudoRPCMiddlewareResource.create('dep1', null as any);
        dep1.addSatisfy('dep1');
        dep1.addDependency('dep2');

        const dep2 = SudoRPCMiddlewareResource.create('dep2', null as any);
        dep2.addSatisfy('dep2');


        const planner = SudoRPCPlanner.create()
            .register(simpleSatisfiesRoot)
            .register(dep1)
            .register(dep2);

        const result: SudoRPCExecutionPlan<any, any, any, any> = planner.plan({

            version: '1.0',

            identifier: chance.string(),

            resource: 'root',
            metadata: {},
            payload: {},
        });

        expect(result).to.be.deep.equal({

            satisfiable: true,
        });
    });
});
