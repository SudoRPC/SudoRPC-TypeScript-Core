/**
 * @author WMXPY
 * @namespace Service_Error
 * @description Error Generator
 */

import { SudoRPCCall } from "../../structure/call";
import { SudoRPCReturn } from "../../structure/return";

export class SudoRPCServiceErrorGenerator<Metadata, Payload, SuccessResult, FailResult> {

    public static create<Metadata, Payload, SuccessResult, FailResult>(
        call: SudoRPCCall<Metadata, Payload>,
    ): SudoRPCServiceErrorGenerator<Metadata, Payload, SuccessResult, FailResult> {

        return new SudoRPCServiceErrorGenerator<Metadata, Payload, SuccessResult, FailResult>(
            call,
        );
    }

    private readonly _call: SudoRPCCall<Metadata, Payload>;

    private constructor(
        call: SudoRPCCall<Metadata, Payload>,
    ) {
        this._call = call;
    }

    public createInternalError(
        error: string,
        message: string,
    ): SudoRPCReturn<SuccessResult, FailResult> {

        return {
            version: '1.0',
            identifier: this._call.identifier,
            success: false,
            isInternalError: true,
            error,
            message,
        };
    }
}
