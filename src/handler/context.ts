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

    public getMetadataKey<K extends keyof Metadata>(key: K): Metadata[K] {

        return this.metadata[key];
    }

    public getPayloadKey<K extends keyof Payload>(key: K): Payload[K] {

        return this.payload[key];
    }

    public setDefaultContext(key: string, value: any): this {

        return this.setContext(DEFAULT_NAMESPACE_SYMBOL, key, value);
    }

    public setContext(namespace: symbol | string, key: string, value: any): this {

        const contextMap: Map<string, any> = this._getNamespaceMap(namespace);
        contextMap.set(key, value);
        return this;
    }

    public setDefaultContextMap(contextMap: Map<string, any>): this {

        return this.setContextMap(DEFAULT_NAMESPACE_SYMBOL, contextMap);
    }

    public setContextMap(namespace: symbol | string, contextMap: Map<string, any>): this {

        const namespaceSymbol: symbol = this._getNamespaceSymbol(namespace);
        this._namespaces.set(namespaceSymbol, contextMap);
        return this;
    }

    public getDefaultContext<T = any>(key: string): T {

        return this.getContext(DEFAULT_NAMESPACE_SYMBOL, key);
    }

    public getContext<T = any>(namespace: symbol | string, key: string): T {

        const contextMap: Map<string, any> = this._getNamespaceMap(namespace);
        return contextMap.get(key);
    }

    public getDefaultContextMap(): Map<string, any> {

        return this.getContextMap(DEFAULT_NAMESPACE_SYMBOL);
    }

    public getContextMap(namespace: symbol | string): Map<string, any> {

        const contextMap: Map<string, any> = this._getNamespaceMap(namespace);
        return contextMap;
    }

    public removeDefaultNamespace(): this {

        return this.removeNamespace(DEFAULT_NAMESPACE_SYMBOL);
    }

    public removeNamespace(namespace: symbol | string): this {

        const namespaceSymbol: symbol = this._getNamespaceSymbol(namespace);
        this._namespaces.delete(namespaceSymbol);
        return this;
    }

    public removeDefaultContext(key: string): this {

        return this.removeContext(DEFAULT_NAMESPACE_SYMBOL, key);
    }

    public removeContext(namespace: symbol | string, key: string): this {

        const contextMap: Map<string, any> = this._getNamespaceMap(namespace);
        contextMap.delete(key);
        return this;
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
