/**
 * @author WMXPY
 * @namespace Call
 * @description Declare
 */

export type SudoRPCCreateCallConfig<Metadata, Payload> = {

    readonly resource: string;
    readonly identifier: string;

    readonly metadata: Metadata;
    readonly payload: Payload;
};
