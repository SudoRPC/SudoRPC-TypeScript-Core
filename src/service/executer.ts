/**
 * @author WMXPY
 * @namespace Service
 * @description Executer
 */

import { SudoRPCEndpointResourceHandlerReturn, SudoRPCMiddlewareResourceHandlerReturn } from "../handler/declare";
import { AvailableResource } from "../planner/declare";
import { RESOURCE_TYPE, RESOURCE_TYPE_SYMBOL } from "../resource/base-resource";
import { SudoRPCCall } from "../structure/call";

export const executeAvailableResource = async <Metadata, Payload, SuccessResult, FailResult>(
    resource: AvailableResource<Metadata, Payload, SuccessResult, FailResult>,
    call: SudoRPCCall<Metadata, Payload>,
) => {

    if (resource[RESOURCE_TYPE_SYMBOL] === RESOURCE_TYPE.MIDDLEWARE) {

        const result: SudoRPCMiddlewareResourceHandlerReturn<FailResult> =
            await resource.execute(call);

    } else if (resource[RESOURCE_TYPE_SYMBOL] === RESOURCE_TYPE.ENDPOINT) {

        const result: SudoRPCEndpointResourceHandlerReturn<SuccessResult, FailResult> =
            await resource.execute(call);
    }
    throw new Error('Unknown resource type');
};
