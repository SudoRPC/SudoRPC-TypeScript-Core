/**
 * @author WMXPY
 * @namespace Call
 * @description Manager
 */

import { UUIDVersion4 } from "@sudoo/uuid";
import { SudoRPCCall } from "../structure/call";
import { SudoRPCReturn, SudoRPCReturnV1ErrorItem } from "../structure/return";
import { SudoRPCCallCallback } from "./callback";
import { createSudoRPCCall } from "./create";
import { SudoRPCCallProxy } from "./proxy";

export class SudoRPCCallManager<Metadata, Payload, SuccessResult, FailResult> {

    public static create<Metadata, Payload, SuccessResult, FailResult>(
        proxy: SudoRPCCallProxy<Metadata, Payload, SuccessResult, FailResult>,
    ): SudoRPCCallManager<Metadata, Payload, SuccessResult, FailResult> {

        return new SudoRPCCallManager<Metadata, Payload, SuccessResult, FailResult>(
            proxy,
        );
    }

    private readonly _proxy: SudoRPCCallProxy<Metadata, Payload, SuccessResult, FailResult>;

    private readonly _callbacks: Map<string, SudoRPCCallCallback<SuccessResult, FailResult>>;
    private readonly _listeners: Set<string>;

    private constructor(
        proxy: SudoRPCCallProxy<Metadata, Payload, SuccessResult, FailResult>,
    ) {

        this._listenerCallback = this._listenerCallback.bind(this);

        this._proxy = proxy;

        this._callbacks = new Map();
        this._listeners = new Set();
    }

    public ignite(): void {

        const listenerId: string = UUIDVersion4.generate().toString();

        // eslint-disable-next-line @typescript-eslint/unbound-method
        this._proxy.addListener(listenerId, this._listenerCallback);
    }

    public dialDown(): void {

        for (const listener of this._listeners) {
            this._proxy.removeListener(listener);
        }
        this._listeners.clear();
    }

    public makeCall(
        resourceName: string,
        metadata: Metadata,
        payload: Payload,
    ): Promise<SuccessResult> {

        const identifier: string = UUIDVersion4.generate().toString();

        return new Promise<SuccessResult>((
            resolve: (result: SuccessResult) => void,
            reject: (errors: Array<SudoRPCReturnV1ErrorItem<FailResult>>) => void,
        ) => {

            const callback: SudoRPCCallCallback<SuccessResult, FailResult> =
                SudoRPCCallCallback.create(resolve, reject);

            this._callbacks.set(identifier, callback);

            const call: SudoRPCCall<Metadata, Payload> = createSudoRPCCall({
                identifier,
                resource: resourceName,
                metadata,
                payload,
            });

            this._proxy.send(call);
        });
    }

    public resolveCall(
        identifier: string,
        result: SuccessResult,
    ): void {

        if (!this._callbacks.has(identifier)) {
            throw new Error(`Cannot find callback with identifier: ${identifier}`);
        }

        const callback: SudoRPCCallCallback<SuccessResult, FailResult> =
            this._callbacks.get(identifier) as SudoRPCCallCallback<SuccessResult, FailResult>;

        callback.resolve(result);

        this._callbacks.delete(identifier);
    }

    public rejectCall(
        identifier: string,
        errors: Array<SudoRPCReturnV1ErrorItem<FailResult>>,
    ): void {

        if (!this._callbacks.has(identifier)) {
            throw new Error(`Cannot find callback with identifier: ${identifier}`);
        }

        const callback: SudoRPCCallCallback<SuccessResult, FailResult> =
            this._callbacks.get(identifier) as SudoRPCCallCallback<SuccessResult, FailResult>;

        callback.reject(errors);

        this._callbacks.delete(identifier);
    }

    private _listenerCallback(message: SudoRPCReturn<SuccessResult, FailResult>): void {

        if (message.success) {

            this.resolveCall(
                message.identifier,
                message.result,
            );
        } else {

            this.rejectCall(
                message.identifier,
                message.errors,
            );
        }
    }
}
