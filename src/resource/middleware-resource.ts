/**
 * @author WMXPY
 * @namespace Resource
 * @description Middleware Resource
 */

import { SudoRPCHandlerContext } from "../handler/context";
import { SudoRPCMiddlewareResourceHandler, SudoRPCMiddlewareResourceHandlerReturn } from "../handler/declare";
import { SudoRPCMiddlewareHandlerHelper } from "../handler/helper/middleware-helper";
import { SudoRPCCall } from "../structure/call";
import { SudoRPCBaseResource } from "./base-resource";
import { fixCreateMiddlewareResourceConfig } from "./config";
import { CreateMiddlewareResourceConfig, RESOURCE_TYPE, RESOURCE_TYPE_SYMBOL } from "./declare";

export class SudoRPCMiddlewareResource<Metadata, Payload, FailResult> extends SudoRPCBaseResource {

    public static create<Metadata, Payload, FailResult>(
        resourceName: string,
        handler: SudoRPCMiddlewareResourceHandler<Metadata, Payload, FailResult>,
        config?: Partial<CreateMiddlewareResourceConfig>,
    ): SudoRPCMiddlewareResource<Metadata, Payload, FailResult> {

        return new SudoRPCMiddlewareResource<Metadata, Payload, FailResult>(
            resourceName,
            handler,
            fixCreateMiddlewareResourceConfig(config),
        );
    }

    public [RESOURCE_TYPE_SYMBOL]: RESOURCE_TYPE.MIDDLEWARE = RESOURCE_TYPE.MIDDLEWARE;

    private readonly _handler: SudoRPCMiddlewareResourceHandler<Metadata, Payload, FailResult>;

    private constructor(
        resourceName: string,
        handler: SudoRPCMiddlewareResourceHandler<Metadata, Payload, FailResult>,
        config: CreateMiddlewareResourceConfig,
    ) {

        super(resourceName, config.dependencies, config.satisfies);

        this._handler = handler;
    }

    public execute(
        call: SudoRPCCall<Metadata, Payload>,
        context: SudoRPCHandlerContext<Metadata, Payload>,
    ): SudoRPCMiddlewareResourceHandlerReturn<FailResult> {

        const helper: SudoRPCMiddlewareHandlerHelper<Metadata, Payload, FailResult> =
            this._createHelper(call);

        return this._handler(context, helper);
    }

    protected _createHelper(
        call: SudoRPCCall<Metadata, Payload>,
    ): SudoRPCMiddlewareHandlerHelper<Metadata, Payload, FailResult> {

        const helper: SudoRPCMiddlewareHandlerHelper<Metadata, Payload, FailResult> =
            SudoRPCMiddlewareHandlerHelper.create(call);

        return helper;
    }
}
