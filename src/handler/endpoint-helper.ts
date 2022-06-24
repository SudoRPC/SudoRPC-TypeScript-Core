/**
 * @author WMXPY
 * @namespace Handler
 * @description Endpoint Helper
 */

import { SudoRPCCall } from "../structure/call";

export class SudoRPCEndpointHandlerHelper<Metadata, Payload, SuccessResult, FailResult> {

    public static create<Metadata, Payload, SuccessResult, FailResult>(
        call: SudoRPCCall<Metadata, Payload>,
    ): SudoRPCEndpointHandlerHelper<Metadata, Payload, SuccessResult, FailResult> {

        return new SudoRPCEndpointHandlerHelper(call);
    }

    private readonly _call: SudoRPCCall<Metadata, Payload>;

    private constructor(
        call: SudoRPCCall<Metadata, Payload>,
    ) {

        this._call = call;
    }
}
