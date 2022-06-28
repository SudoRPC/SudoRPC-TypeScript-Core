/**
 * @author WMXPY
 * @namespace Service
 * @description Counter
 * @override Mock
 */

import { SudoRPCEndpointHandlerHelper, SudoRPCEndpointResource, SudoRPCEndpointResourceHandlerReturn, SudoRPCHandlerContext, SudoRPCService } from "../../../src";

export const createCounterService = (): SudoRPCService<any, any, any, any> => {

    const service: SudoRPCService<any, any, any, any> = SudoRPCService.create("counter");

    service.register(
        SudoRPCEndpointResource.createExposed("increment", (
            context: SudoRPCHandlerContext<any, any>,
            helper: SudoRPCEndpointHandlerHelper<any, any, any, any>,
        ): SudoRPCEndpointResourceHandlerReturn<any, any> => {

            return helper.createSuccessReturn(context.payload.first + context.payload.second);
        }, [], []),
    );

    return service;
};
