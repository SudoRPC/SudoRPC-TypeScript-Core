/**
 * @author WMXPY
 * @namespace Resource
 * @description Endpoint Resource
 */

import { SudoRPCBaseResource } from "./base-resource";

export class SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult> extends SudoRPCBaseResource {

    public static create<Metadata, Payload, SuccessResult, FailResult>(
        resourceName: string,
        dependencies: string[] = [],
        satisfies: string[] = [],
    ): SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult> {

        return new SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult>(
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
