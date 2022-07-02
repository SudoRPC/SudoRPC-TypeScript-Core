/**
 * @author WMXPY
 * @namespace Resource
 * @description Declare
 */

export const RESOURCE_TYPE_SYMBOL = Symbol("resource-type");
export enum RESOURCE_TYPE {
    ENDPOINT = "ENDPOINT",
    MIDDLEWARE = "MIDDLEWARE",
}

export type CreateResourceConfig = {

    readonly dependencies: string[];
    readonly satisfies: string[];
};

export type CreateMiddlewareResourceConfig = {
} & CreateResourceConfig;

export type CreateEndpointResourceConfig = {

    readonly exposed: boolean;
} & CreateResourceConfig;
