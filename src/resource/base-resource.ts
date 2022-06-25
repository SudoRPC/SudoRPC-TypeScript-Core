/**
 * @author WMXPY
 * @namespace Resource
 * @description Base Resource
 */

import { SudoRPCHandlerContext } from "../handler/context";
import { SudoRPCCall } from "../structure/call";

export abstract class SudoRPCBaseResource<Metadata, Payload, SuccessResult, FailResult> {

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

    public addDependency(dependency: string): void {
        this._dependencies.push(dependency);
    }

    public addSatisfy(satisfy: string): void {
        this._satisfies.push(satisfy);
    }

    protected _createContext(call: SudoRPCCall<Metadata, Payload>): SudoRPCHandlerContext<Metadata, Payload> {

        const context: SudoRPCHandlerContext<Metadata, Payload> =
            SudoRPCHandlerContext.create(call);

        return context;
    }
}
