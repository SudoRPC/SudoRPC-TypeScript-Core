/**
 * @author WMXPY
 * @namespace Dependencies
 * @description Infinity Loop
 * @override Mock
 */

import { AvailableResource, SudoRPCEndpointResource, SudoRPCMiddlewareResource } from "../../../src";

export const infinityLoopSatisfies: Map<string, Set<AvailableResource<any, any, any, any>>> = new Map();

export const infinityLoopSatisfiesRoot = SudoRPCEndpointResource.createExposed('root', null as any);
infinityLoopSatisfiesRoot.addDependency('dep1');

const dep1 = SudoRPCMiddlewareResource.create('dep1', null as any);
dep1.addSatisfy('dep1');
dep1.addDependency('dep2');

const dep2 = SudoRPCMiddlewareResource.create('dep2', null as any);
dep2.addSatisfy('dep2');
dep2.addDependency('dep1');

infinityLoopSatisfies.set('dep1', new Set([dep1]));
infinityLoopSatisfies.set('dep2', new Set([dep2]));
