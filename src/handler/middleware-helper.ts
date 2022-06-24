/**
 * @author WMXPY
 * @namespace Handler
 * @description Middleware Helper
 */

import { SudoRPCCall } from "../structure/call";
import { SudoRPCBaseHandlerHelper } from "./base-helper";

export class SudoRPCMiddlewareHandlerHelper<Metadata, Payload, FailResult> extends SudoRPCBaseHandlerHelper<Metadata, Payload> {

    public static create<Metadata, Payload, FailResult>(
        call: SudoRPCCall<Metadata, Payload>,
    ): SudoRPCMiddlewareHandlerHelper<Metadata, Payload, FailResult> {

        return new SudoRPCMiddlewareHandlerHelper(call);
    }

    private constructor(
        call: SudoRPCCall<Metadata, Payload>,
    ) {

        super(call);
    }
}
