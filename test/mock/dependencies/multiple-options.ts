/**
 * @author WMXPY
 * @namespace Dependencies
 * @description Multiple-Options
 * @override Mock
 */

import { AvailableResource, SudoRPCEndpointResource, SudoRPCMiddlewareResource } from "../../../src";

export const multipleOptionsSatisfies: Map<string, Set<AvailableResource<any, any, any, any>>> = new Map();

export const multipleOptionsSatisfiesRoot = SudoRPCEndpointResource.create('root', null as any);
multipleOptionsSatisfiesRoot.addDependency('dep1');

const dep1 = SudoRPCMiddlewareResource.create('dep1', null as any);
dep1.addSatisfy('dep1');
dep1.addDependency('dep2');

const dep2 = SudoRPCMiddlewareResource.create('dep2', null as any);
dep2.addSatisfy('dep2');
dep2.addDependency('dep-none')

const dep3 = SudoRPCMiddlewareResource.create('dep3', null as any);
dep3.addSatisfy('dep2');
dep3.addDependency('dep5');
dep3.addDependency('dep6');

const dep4 = SudoRPCMiddlewareResource.create('dep4', null as any);
dep4.addSatisfy('dep4');
dep4.addDependency('dep5');

const dep5 = SudoRPCMiddlewareResource.create('dep5', null as any);
dep5.addSatisfy('dep5');

const dep6 = SudoRPCMiddlewareResource.create('dep6', null as any);
dep6.addSatisfy('dep6');

multipleOptionsSatisfies.set('dep1', new Set([dep1]));
multipleOptionsSatisfies.set('dep2', new Set([dep2, dep3]));
multipleOptionsSatisfies.set('dep4', new Set([dep4]));
multipleOptionsSatisfies.set('dep5', new Set([dep5]));
multipleOptionsSatisfies.set('dep6', new Set([dep6]));
