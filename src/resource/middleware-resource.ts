/**
 * @author WMXPY
 * @namespace Resource
 * @description Middleware Resource
 */

import { SudoRPCHandlerContext } from "../handler/context";
import { SudoRPCMiddlewareResourceHandler, SudoRPCMiddlewareResourceHandlerReturn } from "../handler/declare";
import { SudoRPCMiddlewareHandlerHelper } from "../handler/middleware-helper";
import { SudoRPCCall } from "../structure/call";
import { SudoRPCBaseResource } from "./base-resource";

export class SudoRPCMiddlewareResource<Metadata, Payload, FailResult> extends SudoRPCBaseResource<Metadata, Payload> {

    public static create<Metadata, Payload, FailResult>(
        resourceName: string,
        handler: SudoRPCMiddlewareResourceHandler<Metadata, Payload, FailResult>,
        dependencies: string[] = [],
        satisfies: string[] = [],
    ): SudoRPCMiddlewareResource<Metadata, Payload, FailResult> {

        return new SudoRPCMiddlewareResource<Metadata, Payload, FailResult>(
            resourceName,
            handler,
            dependencies,
            satisfies,
        );
    }

    private readonly _handler: SudoRPCMiddlewareResourceHandler<Metadata, Payload, FailResult>;

    private constructor(
        resourceName: string,
        handler: SudoRPCMiddlewareResourceHandler<Metadata, Payload, FailResult>,
        dependencies: string[],
        satisfies: string[],
    ) {

        super(resourceName, dependencies, satisfies);

        this._handler = handler;
    }

    public execute(call: SudoRPCCall<Metadata, Payload>): SudoRPCMiddlewareResourceHandlerReturn<FailResult> {

        const context: SudoRPCHandlerContext<Metadata, Payload> =
            this._createContext(call);

        const helper: SudoRPCMiddlewareHandlerHelper<Metadata, Payload, FailResult> =
            this._createHelper(call);

        return this._handler(context, helper);
    }

    protected _createHelper(call: SudoRPCCall<Metadata, Payload>): SudoRPCMiddlewareHandlerHelper<Metadata, Payload, FailResult> {

        const helper: SudoRPCMiddlewareHandlerHelper<Metadata, Payload, FailResult> =
            SudoRPCMiddlewareHandlerHelper.create(call);

        return helper;
    }
}
