/**
 * @author WMXPY
 * @namespace Handler
 * @description Endpoint Helper
 */

import { SudoRPCCall } from "../../structure/call";
import { SudoRPCEndpointResourceHandlerReturnObject } from "../declare";
import { SudoRPCBaseHandlerHelper } from "./base-helper";

export class SudoRPCEndpointHandlerHelper<Metadata, Payload, SuccessResult, FailResult> extends SudoRPCBaseHandlerHelper<Metadata, Payload> {

    public static create<Metadata, Payload, SuccessResult, FailResult>(
        call: SudoRPCCall<Metadata, Payload>,
    ): SudoRPCEndpointHandlerHelper<Metadata, Payload, SuccessResult, FailResult> {

        return new SudoRPCEndpointHandlerHelper(call);
    }

    private constructor(
        call: SudoRPCCall<Metadata, Payload>,
    ) {

        super(call);
    }

    public createSuccessReturn(
        result: SuccessResult,
    ): SudoRPCEndpointResourceHandlerReturnObject<SuccessResult, FailResult> {

        return {
            succeed: true,
            result,
        };
    }

    public createFailReturn(
        error: string,
        message: string,
        failResult: FailResult,
    ): SudoRPCEndpointResourceHandlerReturnObject<SuccessResult, FailResult> {

        return {
            succeed: false,
            error,
            message,
            result: failResult,
        };
    }
}
