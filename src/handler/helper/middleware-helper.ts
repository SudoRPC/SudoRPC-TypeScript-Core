/**
 * @author WMXPY
 * @namespace Handler
 * @description Middleware Helper
 */

import { SudoRPCCall } from "../../structure/call";
import { SudoRPCMiddlewareResourceHandlerReturnObject } from "../declare";
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

    public createShouldContinueReturn(): SudoRPCMiddlewareResourceHandlerReturnObject<FailResult> {

        return {
            shouldContinue: true,
        };
    }

    public createShouldAbortReturn(
        error: string,
        message: string,
        failResult: FailResult,
    ): SudoRPCMiddlewareResourceHandlerReturnObject<FailResult> {

        return {
            shouldContinue: false,
            error,
            message,
            result: failResult,
        };
    }
}
