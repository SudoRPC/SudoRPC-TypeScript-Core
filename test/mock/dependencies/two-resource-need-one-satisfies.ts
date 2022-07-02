/**
 * @author WMXPY
 * @namespace Dependencies
 * @description Two Resources Need One Satisfies
 * @override Mock
 */

import { AvailableResource, SudoRPCEndpointResource, SudoRPCMiddlewareResource } from "../../../src";

export const twoResourcesNeedOneSatisfies: Map<string, Set<AvailableResource<any, any, any, any>>> = new Map();

export const twoResourcesNeedOneSatisfiesRoot = SudoRPCEndpointResource.create('root', null as any);
twoResourcesNeedOneSatisfiesRoot.addDependency('dep1');

const dep1 = SudoRPCMiddlewareResource.create('dep1', null as any);
dep1.addSatisfy('dep1');
dep1.addDependency('dep2');
dep1.addDependency('dep3');

const dep2 = SudoRPCMiddlewareResource.create('dep2', null as any);
dep2.addSatisfy('dep2');

const dep3 = SudoRPCMiddlewareResource.create('dep3', null as any);
dep3.addSatisfy('dep3');

twoResourcesNeedOneSatisfies.set('dep1', new Set([dep1]));
twoResourcesNeedOneSatisfies.set('dep2', new Set([dep2]));
twoResourcesNeedOneSatisfies.set('dep3', new Set([dep3]));
