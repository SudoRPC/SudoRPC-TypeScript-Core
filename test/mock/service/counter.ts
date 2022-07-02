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
        }, {
            satisfies: ["plus-one"],
        }),
    );

    service.register(
        SudoRPCEndpointResource.create("increment", (
            context: SudoRPCHandlerContext<any, any>,
            helper: SudoRPCEndpointHandlerHelper<any, any, any, any>,
        ): SudoRPCEndpointResourceHandlerReturn<any, any> => {

            return helper.createSuccessReturn(
                // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                context.getPayloadKey("first")
                + context.getPayloadKey("second")
                + context.getDefaultContext("plus"),
            );
        }, {
            dependencies: ["plus-one"],
        }),
    );

    return service;
};
