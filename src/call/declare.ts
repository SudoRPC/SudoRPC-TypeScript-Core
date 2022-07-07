/**
 * @author WMXPY
 * @namespace Call
 * @description Declare
 */

import { SudoRPCReturn } from "../structure/return";

export type SudoRPCCreateCallConfig<Metadata, Payload> = {

    readonly resource: string;
    readonly identifier: string;

    readonly metadata: Metadata;
    readonly payload: Payload;
};

export type SudoRPCCallProxyCallback<SuccessResult, FailResult> = (message: SudoRPCReturn<SuccessResult, FailResult>) => void;
