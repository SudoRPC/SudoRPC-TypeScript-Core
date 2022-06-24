/**
 * @author WMXPY
 * @namespace Resource
 * @description Middleware Resource
 */

import { SudoRPCMiddlewareResourceHandler } from "../handler/declare";
import { SudoRPCBaseResource } from "./base-resource";

export class SudoRPCMiddlewareResource<Metadata, Payload, FailResult> extends SudoRPCBaseResource {

    public static create<Metadata, Payload, FailResult>(
        resourceName: string,
        handler: SudoRPCMiddlewareResourceHandler<Metadata, Payload, FailResult>,
        dependencies: string[] = [],
        satisfies: string[] = [],
    ): SudoRPCMiddlewareResource<Metadata, Payload, FailResult> {

        return new SudoRPCMiddlewareResource<Metadata, Payload, FailResult>(
            resourceName,
            handler,
            dependencies,
            satisfies,
        );
    }

    private readonly _handler: SudoRPCMiddlewareResourceHandler<Metadata, Payload, FailResult>;

    private constructor(
        resourceName: string,
        handler: SudoRPCMiddlewareResourceHandler<Metadata, Payload, FailResult>,
        dependencies: string[],
        satisfies: string[],
    ) {

        super(resourceName, dependencies, satisfies);

        this._handler = handler;
    }
}
