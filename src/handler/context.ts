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

    public get metadata(): Metadata {
        return this._call.metadata;
    }

    public get payload(): Payload {
        return this._call.payload;
    }

    public setDefaultContext(key: string, value: any): this {

        return this.setContext(DEFAULT_NAMESPACE_SYMBOL, key, value);
    }

    public setContext(namespace: symbol | string, key: string, value: any): this {

        const contextMap = this._getNamespaceMap(namespace);
        contextMap.set(key, value);
        return this;
    }

    public getDefaultContext<T = any>(key: string): T {

        return this.getContext(DEFAULT_NAMESPACE_SYMBOL, key);
    }

    public getContext<T = any>(namespace: symbol | string, key: string): T {

        const contextMap = this._getNamespaceMap(namespace);
        return contextMap.get(key);
    }

    private _getNamespaceMap(namespace: symbol | string): Map<string, any> {

        const namespaceSymbol: symbol = this._getNamespaceSymbol(namespace);

        if (!this._namespaces.has(namespaceSymbol)) {
            this._namespaces.set(namespaceSymbol, new Map());
        }
        return this._namespaces.get(namespaceSymbol) as Map<string, any>;
    }

    private _getNamespaceSymbol(namespace: symbol | string): symbol {

        if (typeof namespace === "symbol") {
            return namespace;
        }

        return Symbol.for(namespace);
    }
}
