/**
 * @author WMXPY
 * @namespace Handler
 * @description Declare
 */

import { SudoRPCHandlerContext } from "./context";
import { SudoRPCEndpointHandlerHelper } from "./helper/endpoint-helper";
import { SudoRPCMiddlewareHandlerHelper } from "./helper/middleware-helper";

export type SudoRPCEndpointResourceHandlerReturnObject<SuccessResult, FailResult> = {
    readonly success: true;
    readonly result: SuccessResult;
} | {
    readonly success: false;
    readonly error: string;
    readonly message: string;
    readonly result: FailResult;
};

export type SudoRPCEndpointResourceHandlerReturn<SuccessResult, FailResult> =
    | Promise<SudoRPCEndpointResourceHandlerReturnObject<SuccessResult, FailResult>>
    | SudoRPCEndpointResourceHandlerReturnObject<SuccessResult, FailResult>;

export type SudoRPCEndpointResourceHandler<Metadata, Payload, SuccessResult, FailResult> =
    (
        context: SudoRPCHandlerContext<Metadata, Payload>,
        helper: SudoRPCEndpointHandlerHelper<Metadata, Payload, SuccessResult, FailResult>,
    ) => SudoRPCEndpointResourceHandlerReturn<SuccessResult, FailResult>;

export type SudoRPCMiddlewareResourceHandlerShouldContinueReturnObject = {
    readonly shouldContinue: true;
};

export type SudoRPCMiddlewareResourceHandlerShouldAbortReturnObject<FailResult> = {
    readonly shouldContinue: false;
    readonly error: string;
    readonly message: string;
    readonly result: FailResult;
};

export type SudoRPCMiddlewareResourceHandlerReturnObject<FailResult> =
    | SudoRPCMiddlewareResourceHandlerShouldContinueReturnObject
    | SudoRPCMiddlewareResourceHandlerShouldAbortReturnObject<FailResult>;

export type SudoRPCMiddlewareResourceHandlerReturn<FailResult> =
    | Promise<SudoRPCMiddlewareResourceHandlerReturnObject<FailResult>>
    | SudoRPCMiddlewareResourceHandlerReturnObject<FailResult>;

export type SudoRPCMiddlewareResourceHandler<Metadata, Payload, FailResult> =
    (
        context: SudoRPCHandlerContext<Metadata, Payload>,
        helper: SudoRPCMiddlewareHandlerHelper<Metadata, Payload, FailResult>,
    ) => SudoRPCMiddlewareResourceHandlerReturn<FailResult>;
