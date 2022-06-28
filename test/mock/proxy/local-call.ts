/**
 * @author WMXPY
 * @namespace Proxy
 * @description Local Call
 * @override Mock
 */

import { SudoRPCCall, SudoRPCCallProxy, SudoRPCReturn, SudoRPCService } from "../../../src";

export class MockLocalCallProxy extends SudoRPCCallProxy<any, any, any, any> {

    public static create(
        service: SudoRPCService<any, any, any, any>,
    ): MockLocalCallProxy {
        return new MockLocalCallProxy(service);
    }

    private readonly _service: SudoRPCService<any, any, any, any>;

    private _callback: null | ((message: SudoRPCReturn<any, any>) => void) = null;

    private constructor(
        service: SudoRPCService<any, any, any, any>,
    ) {
        super();
        this._service = service;
    }

    public send(call: SudoRPCCall<any, any>): void {

        this._service.execute(call).then((message: SudoRPCReturn<any, any>) => {
            if (this._callback) {
                this._callback(message);
            }
        });
    }

    public addListener(
        listenerIdentifier: string,
        callback: (message: SudoRPCReturn<any, any>) => void,
    ): void {

        this._callback = callback;
    }

    public removeListener(listenerIdentifier: string): void {

        this._callback = null;
    }
}
