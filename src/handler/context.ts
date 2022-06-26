/**
 * @author WMXPY
 * @namespace Handler
 * @description Context
 */

import { SudoRPCCall } from "../structure/call";

const DEFAULT_NAMESPACE_SYMBOL = Symbol("default-namespace");

export class SudoRPCHandlerContext<Metadata, Payload> {

    public static create<Metadata, Payload>(
        call: SudoRPCCall<Metadata, Payload>,
    ): SudoRPCHandlerContext<Metadata, Payload> {

        return new SudoRPCHandlerContext(call);
    }

    private readonly _call: SudoRPCCall<Metadata, Payload>;

    private readonly _namespaces: Map<symbol, Map<string, any>>;

    private constructor(
        call: SudoRPCCall<Metadata, Payload>,
    ) {

        this._call = call;

        this._namespaces = new Map();
    }
}
