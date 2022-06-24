/**
 * @author WMXPY
 * @namespace Handler
 * @description Middleware Helper
 */

import { SudoRPCCall } from "../structure/call";

export class SudoRPCMiddlewareHandlerHelper<Metadata, Payload, FailResult>{

    public static create<Metadata, Payload, FailResult>(
        call: SudoRPCCall<Metadata, Payload>,
    ): SudoRPCMiddlewareHandlerHelper<Metadata, Payload, FailResult> {

        return new SudoRPCMiddlewareHandlerHelper(call);
    }

    private readonly _call: SudoRPCCall<Metadata, Payload>;

    private constructor(
        call: SudoRPCCall<Metadata, Payload>,
    ) {

        this._call = call;
    }
}
