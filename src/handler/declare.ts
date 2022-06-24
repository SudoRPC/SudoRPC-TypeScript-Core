/**
 * @author WMXPY
 * @namespace Handler
 * @description Declare
 */

import { SudoRPCReturn } from "../structure/return";
import { SudoRPCHandlerContext } from "./context";

export type SudoRPCEndpointResourceHandlerReturn<SuccessResult, FailResult> =
    | Promise<SudoRPCReturn<SuccessResult, FailResult>>
    | SudoRPCReturn<SuccessResult, FailResult>;

export type SudoRPCEndpointResourceHandler<Metadata, Payload, SuccessResult, FailResult> =
    (context: SudoRPCHandlerContext) => SudoRPCEndpointResourceHandlerReturn<SuccessResult, FailResult>;

export type SudoRPCMiddlewareResourceHandlerReturnObject<FailResult> = {

    readonly shouldNext: false;
} | {

    readonly shouldNext: false;
    readonly result: FailResult;
};

export type SudoRPCMiddlewareResourceHandlerReturn<FailResult> =
    | Promise<SudoRPCMiddlewareResourceHandlerReturnObject<FailResult>>
    | SudoRPCMiddlewareResourceHandlerReturnObject<FailResult>;

export type SudoRPCMiddlewareResourceHandler<Metadata, Payload, FailResult> =
    (context: SudoRPCHandlerContext) => SudoRPCMiddlewareResourceHandlerReturn<FailResult>;
