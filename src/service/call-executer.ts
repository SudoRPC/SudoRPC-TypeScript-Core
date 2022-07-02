/**
 * @author WMXPY
 * @namespace Service
 * @description Call Executer
 */

import { SudoRPCHandlerContext } from "../handler/context";
import { SudoRPCEndpointResourceHandlerReturnObject } from "../handler/declare";
import { AvailableResource } from "../planner/declare";
import { RESOURCE_TYPE, RESOURCE_TYPE_SYMBOL } from "../resource/declare";
import { SudoRPCEndpointResource } from "../resource/endpoint-resource";
import { SudoRPCCall } from "../structure/call";

export const executeCallResource = async <Metadata, Payload, SuccessResult, FailResult>(
    resource: AvailableResource<Metadata, Payload, SuccessResult, FailResult>,
    call: SudoRPCCall<Metadata, Payload>,
    context: SudoRPCHandlerContext<Metadata, Payload>,
): Promise<SudoRPCEndpointResourceHandlerReturnObject<SuccessResult, FailResult>> => {

    if (resource[RESOURCE_TYPE_SYMBOL] !== RESOURCE_TYPE.ENDPOINT) {

        throw new Error('Unknown resource type');
    }

    const assertedResource: SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult> =
        resource as SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult>;

    const result: SudoRPCEndpointResourceHandlerReturnObject<SuccessResult, FailResult> =
        await assertedResource.execute(call, context);

    return result;
};
