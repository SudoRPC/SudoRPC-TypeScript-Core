/**
 * @author WMXPY
 * @namespace Service
 * @description Dependency Executer
 */

import { SudoRPCHandlerContext } from "../handler/context";
import { SudoRPCEndpointResourceHandlerReturn, SudoRPCMiddlewareResourceHandlerReturn, SudoRPCMiddlewareResourceHandlerReturnObject, SudoRPCMiddlewareResourceHandlerShouldAbortReturnObject } from "../handler/declare";
import { AvailableResource } from "../planner/declare";
import { RESOURCE_TYPE, RESOURCE_TYPE_SYMBOL } from "../resource/declare";
import { SudoRPCEndpointResource } from "../resource/endpoint-resource";
import { SudoRPCMiddlewareResource } from "../resource/middleware-resource";
import { SudoRPCCall } from "../structure/call";

export const executeAvailableResourceAsMiddleware = async <Metadata, Payload, SuccessResult, FailResult>(
    resource: AvailableResource<Metadata, Payload, SuccessResult, FailResult>,
    call: SudoRPCCall<Metadata, Payload>,
    context: SudoRPCHandlerContext<Metadata, Payload>,
): Promise<SudoRPCMiddlewareResourceHandlerReturnObject<FailResult>> => {

    if (resource[RESOURCE_TYPE_SYMBOL] === RESOURCE_TYPE.MIDDLEWARE) {

        const assertedResource: SudoRPCMiddlewareResource<Metadata, Payload, FailResult> =
            resource as SudoRPCMiddlewareResource<Metadata, Payload, FailResult>;
        const result: SudoRPCMiddlewareResourceHandlerReturn<FailResult> =
            await assertedResource.execute(call, context);

        return result;
    } else if (resource[RESOURCE_TYPE_SYMBOL] === RESOURCE_TYPE.ENDPOINT) {

        const assertedResource: SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult> =
            resource as SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult>;
        const result: SudoRPCEndpointResourceHandlerReturn<SuccessResult, FailResult> =
            await assertedResource.execute(call, context);

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

export const executeParallelAvailableResourceListAsMiddleware = async <Metadata, Payload, SuccessResult, FailResult>(
    resources: Array<AvailableResource<Metadata, Payload, SuccessResult, FailResult>>,
    call: SudoRPCCall<Metadata, Payload>,
    context: SudoRPCHandlerContext<Metadata, Payload>,
): Promise<Array<SudoRPCMiddlewareResourceHandlerShouldAbortReturnObject<FailResult>>> => {

    const executeList: Array<Promise<SudoRPCMiddlewareResourceHandlerReturnObject<FailResult>>> = [];

    for (const resource of resources) {
        executeList.push(Promise.resolve(executeAvailableResourceAsMiddleware(
            resource,
            call,
            context,
        )));
    }

    const failResults: Array<SudoRPCMiddlewareResourceHandlerShouldAbortReturnObject<FailResult>> = [];

    const executeResults: Array<SudoRPCMiddlewareResourceHandlerReturnObject<FailResult>> = await Promise.all(executeList);
    for (const executeResult of executeResults) {

        if (executeResult.shouldContinue) {
            continue;
        }
        failResults.push(executeResult);
    }

    return failResults;
};
