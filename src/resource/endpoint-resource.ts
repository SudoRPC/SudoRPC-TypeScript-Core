/**
 * @author WMXPY
 * @namespace Resource
 * @description Endpoint Resource
 */

import { SudoRPCHandlerContext } from "../handler/context";
import { SudoRPCEndpointResourceHandler, SudoRPCEndpointResourceHandlerReturn } from "../handler/declare";
import { SudoRPCEndpointHandlerHelper } from "../handler/helper/endpoint-helper";
import { SudoRPCCall } from "../structure/call";
import { SudoRPCBaseResource } from "./base-resource";
import { fixCreateEndpointResourceConfig } from "./config";
import { CreateEndpointResourceConfig, RESOURCE_TYPE, RESOURCE_TYPE_SYMBOL } from "./declare";

export class SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult> extends SudoRPCBaseResource {

    public static create<Metadata, Payload, SuccessResult, FailResult>(
        resourceName: string,
        handler: SudoRPCEndpointResourceHandler<Metadata, Payload, SuccessResult, FailResult>,
        config?: Partial<CreateEndpointResourceConfig>,
    ): SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult> {

        return new SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult>(
            resourceName,
            handler,
            fixCreateEndpointResourceConfig(config),
        );
    }

    public [RESOURCE_TYPE_SYMBOL]: RESOURCE_TYPE.ENDPOINT = RESOURCE_TYPE.ENDPOINT;

    private readonly _handler: SudoRPCEndpointResourceHandler<Metadata, Payload, SuccessResult, FailResult>;

    private readonly _exposed: boolean;

    private constructor(
        resourceName: string,
        handler: SudoRPCEndpointResourceHandler<Metadata, Payload, SuccessResult, FailResult>,
        config: CreateEndpointResourceConfig,
    ) {

        super(resourceName, config.dependencies, config.satisfies);

        this._handler = handler;

        this._exposed = config.exposed;
    }

    public get exposed(): boolean {
        return this._exposed;
    }

    public execute(
        call: SudoRPCCall<Metadata, Payload>,
        context: SudoRPCHandlerContext<Metadata, Payload>,
    ): SudoRPCEndpointResourceHandlerReturn<SuccessResult, FailResult> {

        const helper: SudoRPCEndpointHandlerHelper<Metadata, Payload, SuccessResult, FailResult> =
            this._createHelper(call);

        return this._handler(context, helper);
    }

    protected _createHelper(
        call: SudoRPCCall<Metadata, Payload>,
    ): SudoRPCEndpointHandlerHelper<Metadata, Payload, SuccessResult, FailResult> {

        const helper: SudoRPCEndpointHandlerHelper<Metadata, Payload, SuccessResult, FailResult> =
            SudoRPCEndpointHandlerHelper.create(call);

        return helper;
    }
}
