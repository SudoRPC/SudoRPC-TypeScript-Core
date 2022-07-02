/**
 * @author WMXPY
 * @namespace Planner
 * @description Planner
 * @override Unit Test
 */

import { expect } from "chai";
import * as Chance from "chance";
import { SudoRPCEndpointResource, SudoRPCExecutionPlan, SudoRPCMiddlewareResource, SudoRPCPlanner, SUDORPC_PLAN_EXECUTE_STEP_REASON } from "../../../src";

describe('Given {SudoRPCPlanner} Class', (): void => {

    const chance: Chance.Chance = new Chance('planner-process-medium');

    it('should be able to construct', (): void => {

        const planner = SudoRPCPlanner.create();

        expect(planner).to.be.instanceOf(SudoRPCPlanner);
    });

    it('should be able to plan for multiple dependencies', (): void => {

        const root = SudoRPCEndpointResource.create('root', null as any);
        root.addDependency('dep1');

        const dep1 = SudoRPCMiddlewareResource.create('dep1', null as any);
        dep1.addSatisfy('dep1');
        dep1.addDependency('dep2');

        const dep2 = SudoRPCMiddlewareResource.create('dep2', null as any);
        dep2.addSatisfy('dep2');

        const planner = SudoRPCPlanner.create()
            .register(root)
            .register(dep1)
            .register(dep2);

        const result: SudoRPCExecutionPlan<any, any, any, any> = planner.planDependencies({

            version: '1.0',

            identifier: chance.string(),

            resource: 'root',
            metadata: {},
            payload: {},
        });

        expect(result).to.be.deep.equal({

            satisfiable: true,
            steps: [{
                reason: SUDORPC_PLAN_EXECUTE_STEP_REASON.DEPENDENCY,
                dependencyOf: 'dep2',
                resource: dep2,
            }, {
                reason: SUDORPC_PLAN_EXECUTE_STEP_REASON.DEPENDENCY,
                dependencyOf: 'dep1',
                resource: dep1,
            }],
        });
    });

    it('should be able to plan for complex dependencies', (): void => {

        const root = SudoRPCEndpointResource.create('root', null as any);
        root.addDependency('dep1');

        const dep1 = SudoRPCMiddlewareResource.create('dep1', null as any);
        dep1.addSatisfy('dep1');
        dep1.addDependency('dep2');
        dep1.addDependency('dep3');

        const dep2 = SudoRPCMiddlewareResource.create('dep2', null as any);
        dep2.addSatisfy('dep2');

        const dep3 = SudoRPCMiddlewareResource.create('dep3', null as any);
        dep3.addSatisfy('dep3');

        const planner = SudoRPCPlanner.create()
            .register(root)
            .register(dep1)
            .register(dep2)
            .register(dep3);

        const result: SudoRPCExecutionPlan<any, any, any, any> = planner.planDependencies({

            version: '1.0',

            identifier: chance.string(),

            resource: 'root',
            metadata: {},
            payload: {},
        });

        expect(result).to.be.deep.equal({

            satisfiable: true,
            steps: [{
                reason: SUDORPC_PLAN_EXECUTE_STEP_REASON.DEPENDENCY,
                dependencyOf: 'dep2',
                resource: dep2,
            }, {
                reason: SUDORPC_PLAN_EXECUTE_STEP_REASON.DEPENDENCY,
                dependencyOf: 'dep3',
                resource: dep3,
            }, {
                reason: SUDORPC_PLAN_EXECUTE_STEP_REASON.DEPENDENCY,
                dependencyOf: 'dep1',
                resource: dep1,
            }],
        });
    });
});
