/**
 * @author WMXPY
 * @namespace Planner
 * @description Process Declare
 */

import { SudoRPCProcessStatus } from "./process-status";

export const PROCESS_MEDIUM_DEPENDENCY_NOT_FOUND_SYMBOL = Symbol('dependency-not-found');
export const PROCESS_MEDIUM_INFINITY_LOOP_SYMBOL = Symbol('infinity-loop');
export const PROCESS_MEDIUM_RESOURCE_NOT_FOUND_SYMBOL = Symbol('resource-not-found');
export const PROCESS_MEDIUM_UNKNOWN_SYMBOL = Symbol('unknown');

export type FulfillDependencySymbolResult = {

    readonly success: true;

    readonly status: SudoRPCProcessStatus<any, any, any, any>;
} | {

    readonly success: false;

    readonly result:
    | typeof PROCESS_MEDIUM_DEPENDENCY_NOT_FOUND_SYMBOL
    | typeof PROCESS_MEDIUM_INFINITY_LOOP_SYMBOL
    | typeof PROCESS_MEDIUM_RESOURCE_NOT_FOUND_SYMBOL
    | typeof PROCESS_MEDIUM_UNKNOWN_SYMBOL;

    readonly payload: Record<string, any>;
};
