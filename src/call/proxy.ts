/**
 * @author WMXPY
 * @namespace Call
 * @description Proxy
 */

import { SudoRPCCall } from "../structure/call";
import { SudoRPCCallProxyCallback } from "./declare";

export abstract class SudoRPCCallProxy<Metadata, Payload, SuccessResult, FailResult> {

    public abstract send(
        call: SudoRPCCall<Metadata, Payload>,
    ): void;

    public abstract addListener(
        listenerIdentifier: string,
        callback: SudoRPCCallProxyCallback<SuccessResult, FailResult>,
    ): void;

    public abstract removeListener(
        listenerIdentifier: string,
    ): void;
}
