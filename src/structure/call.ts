/**
 * @author WMXPY
 * @namespace Structure
 * @description Call
 */

export type SudoRPCCall<Metadata, Payload> =
    | SudoRPCCallV1<Metadata, Payload>;

export type SudoRPCCallV1<Metadata, Payload> = {

    readonly version: "1.0";

    readonly resource: string;
    readonly identifier: string;

    readonly metadata: Metadata;
    readonly payload: Payload;
};
