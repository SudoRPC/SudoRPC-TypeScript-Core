/**
 * @author WMXPY
 * @namespace Call
 * @description Call
 */

import { SudoRPCCall } from "../structure/call";
import { SudoRPCCreateCallConfig } from "./declare";

export const createCall = <Metadata, Payload>(config: SudoRPCCreateCallConfig<Metadata, Payload>): SudoRPCCall<Metadata, Payload> => {

    return {
        version: "1.0",
        resource: config.resource,
        identifier: config.identifier,
        metadata: config.metadata,
        payload: config.payload,
    };
};
