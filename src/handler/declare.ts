/**
 * @author WMXPY
 * @namespace Handler
 * @description Declare
 */

import { SudoRPCResourceContext } from "../resource/context";
import { SudoRPCEndpointHandlerHelper } from "./endpoint-helper";
import { SudoRPCMiddlewareHandlerHelper } from "./middleware-helper";

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
        context: SudoRPCResourceContext<Metadata, Payload>,
        helper: SudoRPCEndpointHandlerHelper<Metadata, Payload, SuccessResult, FailResult>,
    ) => SudoRPCEndpointResourceHandlerReturn<SuccessResult, FailResult>;

export type SudoRPCMiddlewareResourceHandlerReturnObject<FailResult> = {
    readonly shouldNext: true;
} | {
    readonly shouldNext: false;
    readonly error: string;
    readonly message: string;
    readonly result: FailResult;
};

export type SudoRPCMiddlewareResourceHandlerReturn<FailResult> =
    | Promise<SudoRPCMiddlewareResourceHandlerReturnObject<FailResult>>
    | SudoRPCMiddlewareResourceHandlerReturnObject<FailResult>;

export type SudoRPCMiddlewareResourceHandler<Metadata, Payload, FailResult> =
    (
        context: SudoRPCResourceContext<Metadata, Payload>,
        helper: SudoRPCMiddlewareHandlerHelper<Metadata, Payload, FailResult>,
    ) => SudoRPCMiddlewareResourceHandlerReturn<FailResult>;
