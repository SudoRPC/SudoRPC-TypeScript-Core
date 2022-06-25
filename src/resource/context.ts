/**
 * @author WMXPY
 * @namespace Resource
 * @description Context
 */

import { SudoRPCCall } from "../structure/call";

const DEFAULT_NAMESPACE_SYMBOL = Symbol("default-namespace");

export class SudoRPCResourceContext<Metadata, Payload> {

    public static create<Metadata, Payload>(
        call: SudoRPCCall<Metadata, Payload>,
    ): SudoRPCResourceContext<Metadata, Payload> {

        return new SudoRPCResourceContext(call);
    }

    private readonly _call: SudoRPCCall<Metadata, Payload>;

    private readonly _namespaces: Map<Symbol, Map<string, any>>;

    private constructor(
        call: SudoRPCCall<Metadata, Payload>,
    ) {

        this._call = call;

        this._namespaces = new Map();
    }
}
