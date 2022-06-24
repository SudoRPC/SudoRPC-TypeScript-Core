/**
 * @author WMXPY
 * @namespace Resource
 * @description Endpoint Resource
 */

import { SudoRPCBaseResource } from "./base-resource";

export class SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult> extends SudoRPCBaseResource {

    public static createPrivate<Metadata, Payload, SuccessResult, FailResult>(
        resourceName: string,
        dependencies: string[] = [],
        satisfies: string[] = [],
    ): SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult> {

        return new SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult>(
            resourceName,
            dependencies,
            satisfies,
            false,
        );
    }

    public static createExposed<Metadata, Payload, SuccessResult, FailResult>(
        resourceName: string,
        dependencies: string[] = [],
        satisfies: string[] = [],
    ): SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult> {

        return new SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult>(
            resourceName,
            dependencies,
            satisfies,
            true,
        );
    }

    private readonly _exposed: boolean;

    private constructor(
        resourceName: string,
        dependencies: string[],
        satisfies: string[],
        exposed: boolean,
    ) {

        super(resourceName, dependencies, satisfies);

        this._exposed = exposed;
    }

    public get exposed(): boolean {
        return this._exposed;
    }
}
