/**
 * @author WMXPY
 * @namespace Resource
 * @description Base Resource
 */

import { SudoRPCBaseHandlerHelper } from "../handler/helper/base-helper";
import { SudoRPCHandlerContext } from "../handler/context";
import { SudoRPCCall } from "../structure/call";

export const RESOURCE_TYPE_SYMBOL = Symbol("resource-type");
export enum RESOURCE_TYPE {
    ENDPOINT = "ENDPOINT",
    MIDDLEWARE = "MIDDLEWARE",
}

export abstract class SudoRPCBaseResource<Metadata, Payload> {

    protected readonly _resourceName: string;

    protected readonly _dependencies: string[];
    protected readonly _satisfies: string[];

    protected constructor(
        resourceName: string,
        dependencies: string[],
        satisfies: string[],
    ) {

        this._resourceName = resourceName;

        this._dependencies = dependencies;
        this._satisfies = satisfies;
    }

    public get resourceName(): string {
        return this._resourceName;
    }

    public get dependencies(): string[] {
        return this._dependencies;
    }

    public get satisfies(): string[] {
        return this._satisfies;
    }

    public addDependency(dependency: string): this {

        this._dependencies.push(dependency);
        return this;
    }

    public addSatisfy(satisfy: string): this {

        this._satisfies.push(satisfy);
        return this;
    }
}
