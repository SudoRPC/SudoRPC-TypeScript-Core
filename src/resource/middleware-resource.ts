/**
 * @author WMXPY
 * @namespace Resource
 * @description Middleware Resource
 */

import { SudoRPCBaseResource } from "./base-resource";

export class SudoRPCMiddlewareResource<Metadata, Payload, FailResult> extends SudoRPCBaseResource {

    public static create<Metadata, Payload, FailResult>(
        resourceName: string,
        dependencies: string[] = [],
        satisfies: string[] = [],
    ): SudoRPCMiddlewareResource<Metadata, Payload, FailResult> {

        return new SudoRPCMiddlewareResource<Metadata, Payload, FailResult>(
            resourceName,
            dependencies,
            satisfies,
        );
    }

    private constructor(
        resourceName: string,
        dependencies: string[],
        satisfies: string[],
    ) {

        super(resourceName, dependencies, satisfies);
    }
}
