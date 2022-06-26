/**
 * @author WMXPY
 * @namespace Handler
 * @description Declare
 */

import { SudoRPCHandlerContext } from "./context";
import { SudoRPCEndpointHandlerHelper } from "./helper/endpoint-helper";
import { SudoRPCMiddlewareHandlerHelper } from "./helper/middleware-helper";

export type SudoRPCEndpointResourceHandlerReturnObject<SuccessResult, FailResult> = {
    readonly succeed: true;
    readonly result: SuccessResult;
} | {
    readonly succeed: false;
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

export type SudoRPCMiddlewareResourceHandlerReturnObject<FailResult> = {
    readonly shouldContinue: true;
} | {
    readonly shouldContinue: false;
    readonly error: string;
    readonly message: string;
    readonly result: FailResult;
};

export type SudoRPCMiddlewareResourceHandlerReturn<FailResult> =
    | Promise<SudoRPCMiddlewareResourceHandlerReturnObject<FailResult>>
    | SudoRPCMiddlewareResourceHandlerReturnObject<FailResult>;

export type SudoRPCMiddlewareResourceHandler<Metadata, Payload, FailResult> =
    (
        context: SudoRPCHandlerContext<Metadata, Payload>,
        helper: SudoRPCMiddlewareHandlerHelper<Metadata, Payload, FailResult>,
    ) => SudoRPCMiddlewareResourceHandlerReturn<FailResult>;
