/**
 * @author WMXPY
 * @namespace Call
 * @description Manager
 */

import { SudoRPCReturnV1ErrorItem } from "../structure/return";
import { SudoRPCCallCallback } from "./callback";

export class SudoRPCCallManager<Metadata, Payload, SuccessResult, FailResult> {

    private readonly _callbacks: Map<string, SudoRPCCallCallback<SuccessResult, FailResult>>;

    private constructor() {

        this._callbacks = new Map();
    }

    public makeCall(
        resource: string,
        metadata: Metadata,
        payload: Payload,
    ): Promise<SuccessResult> {

        return new Promise<SuccessResult>((
            resolve: (result: SuccessResult) => void,
            reject: (errors: Array<SudoRPCReturnV1ErrorItem<FailResult>>) => void,
        ) => {

            const callback: SudoRPCCallCallback<SuccessResult, FailResult> =
                SudoRPCCallCallback.create(resolve, reject);

            this._callbacks.set(resource, callback);
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

        if (callback) {
            callback.resolve(result);
        }
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

        if (callback) {
            callback.reject(errors);
        }
    }
}
