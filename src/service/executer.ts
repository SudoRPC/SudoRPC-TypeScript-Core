/**
 * @author WMXPY
 * @namespace Service
 * @description Executer
 */

import { SudoRPCEndpointResourceHandlerReturn, SudoRPCMiddlewareResourceHandlerReturn } from "../handler/declare";
import { AvailableResource } from "../planner/declare";
import { RESOURCE_TYPE, RESOURCE_TYPE_SYMBOL } from "../resource/base-resource";
import { SudoRPCEndpointResource } from "../resource/endpoint-resource";
import { SudoRPCMiddlewareResource } from "../resource/middleware-resource";
import { SudoRPCCall } from "../structure/call";

export const executeAvailableResourceAsMiddleware = async <Metadata, Payload, SuccessResult, FailResult>(
    resource: AvailableResource<Metadata, Payload, SuccessResult, FailResult>,
    call: SudoRPCCall<Metadata, Payload>,
): Promise<SudoRPCMiddlewareResourceHandlerReturn<FailResult>> => {

    if (resource[RESOURCE_TYPE_SYMBOL] === RESOURCE_TYPE.MIDDLEWARE) {

        const assertedResource: SudoRPCMiddlewareResource<Metadata, Payload, FailResult> =
            resource as SudoRPCMiddlewareResource<Metadata, Payload, FailResult>;
        const result: SudoRPCMiddlewareResourceHandlerReturn<FailResult> =
            await assertedResource.execute(call);

        return result;
    } else if (resource[RESOURCE_TYPE_SYMBOL] === RESOURCE_TYPE.ENDPOINT) {

        const assertedResource: SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult> =
            resource as SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult>;
        const result: SudoRPCEndpointResourceHandlerReturn<SuccessResult, FailResult> =
            await assertedResource.execute(call);

        if (result.success) {
            return {
                shouldContinue: true,
            };
        }

        return {
            shouldContinue: false,
            error: result.error,
            message: result.message,
            result: result.result,
        };
    }
    throw new Error('Unknown resource type');
};
