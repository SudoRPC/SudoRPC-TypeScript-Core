/**
 * @author WMXPY
 * @namespace Call
 * @description Proxy
 */

import { SudoRPCCall } from "../structure/call";
import { SudoRPCReturn } from "../structure/return";

export abstract class SudoRPCCallProxy<Metadata, Payload, SuccessResult, FailResult> {

    public abstract send(call: SudoRPCCall<Metadata, Payload>): void;

    public abstract addListener(
        listenerIdentifier: string,
        callback: (message: SudoRPCReturn<SuccessResult, FailResult>) => void,
    ): void;

    public abstract removeListener(listenerIdentifier: string): void;
}
