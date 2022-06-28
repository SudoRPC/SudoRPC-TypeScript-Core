/**
 * @author WMXPY
 * @namespace Service
 * @description Counter
 * @override Mock
 */

import { SudoRPCEndpointHandlerHelper, SudoRPCEndpointResource, SudoRPCEndpointResourceHandlerReturn, SudoRPCHandlerContext, SudoRPCMiddlewareHandlerHelper, SudoRPCMiddlewareResource, SudoRPCMiddlewareResourceHandlerReturn, SudoRPCService } from "../../../src";

export const createCounterService = (): SudoRPCService<any, any, any, any> => {

    const service: SudoRPCService<any, any, any, any> = SudoRPCService.create("counter");

    service.register(
        SudoRPCMiddlewareResource.create("middleware-plus-one", (
            context: SudoRPCHandlerContext<any, any>,
            helper: SudoRPCMiddlewareHandlerHelper<any, any, any>,
        ): SudoRPCMiddlewareResourceHandlerReturn<any> => {

            context.setDefaultContext("plus", 1);

            return helper.createShouldContinueReturn();
        }, [], ["plus-one"]),
    );

    service.register(
        SudoRPCEndpointResource.createExposed("increment", (
            context: SudoRPCHandlerContext<any, any>,
            helper: SudoRPCEndpointHandlerHelper<any, any, any, any>,
        ): SudoRPCEndpointResourceHandlerReturn<any, any> => {

            return helper.createSuccessReturn(
                context.getPayloadKey("first")
                + context.getPayloadKey("second")
                // + context.getDefaultContext("plus"),
            );
        }, ["plus-one"]),
    );

    return service;
};
