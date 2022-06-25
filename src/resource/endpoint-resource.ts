/**
 * @author WMXPY
 * @namespace Resource
 * @description Endpoint Resource
 */

import { SudoRPCHandlerContext } from "../handler/context";
import { SudoRPCEndpointResourceHandler, SudoRPCEndpointResourceHandlerReturn } from "../handler/declare";
import { SudoRPCEndpointHandlerHelper } from "../handler/endpoint-helper";
import { SudoRPCCall } from "../structure/call";
import { SudoRPCBaseResource } from "./base-resource";

export class SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult> extends SudoRPCBaseResource<Metadata, Payload> {

    public static createPrivate<Metadata, Payload, SuccessResult, FailResult>(
        resourceName: string,
        handler: SudoRPCEndpointResourceHandler<Metadata, Payload, SuccessResult, FailResult>,
        dependencies: string[] = [],
        satisfies: string[] = [],
    ): SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult> {

        return new SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult>(
            resourceName,
            handler,
            dependencies,
            satisfies,
            false,
        );
    }

    public static createExposed<Metadata, Payload, SuccessResult, FailResult>(
        resourceName: string,
        handler: SudoRPCEndpointResourceHandler<Metadata, Payload, SuccessResult, FailResult>,
        dependencies: string[] = [],
        satisfies: string[] = [],
    ): SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult> {

        return new SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult>(
            resourceName,
            handler,
            dependencies,
            satisfies,
            true,
        );
    }

    private readonly _handler: SudoRPCEndpointResourceHandler<Metadata, Payload, SuccessResult, FailResult>;

    private readonly _exposed: boolean;

    private constructor(
        resourceName: string,
        handler: SudoRPCEndpointResourceHandler<Metadata, Payload, SuccessResult, FailResult>,
        dependencies: string[],
        satisfies: string[],
        exposed: boolean,
    ) {

        super(resourceName, dependencies, satisfies);

        this._handler = handler;

        this._exposed = exposed;
    }

    public get exposed(): boolean {
        return this._exposed;
    }

    public execute(call: SudoRPCCall<Metadata, Payload>): SudoRPCEndpointResourceHandlerReturn<SuccessResult, FailResult> {

        const context: SudoRPCHandlerContext<Metadata, Payload> =
            this._createContext(call);

        const helper: SudoRPCEndpointHandlerHelper<Metadata, Payload, SuccessResult, FailResult> =
            this._createHelper(call);

        return this._handler(context, helper);
    }

    protected _createHelper(call: SudoRPCCall<Metadata, Payload>): SudoRPCEndpointHandlerHelper<Metadata, Payload, SuccessResult, FailResult> {

        const helper: SudoRPCEndpointHandlerHelper<Metadata, Payload, SuccessResult, FailResult> =
            SudoRPCEndpointHandlerHelper.create(call);

        return helper;
    }
}
