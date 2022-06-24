/**
 * @author WMXPY
 * @namespace Service
 * @description Service
 */

import { SudoRPCEndpointResource } from "../resource/endpoint-resource";
import { SudoRPCMiddlewareResource } from "../resource/middleware-resource";
import { SudoRPCCall } from "../structure/call";
import { SudoRPCReturn } from "../structure/return";

type AvailableResource<Metadata, Payload, SuccessResult, FailResult> =
    | SudoRPCMiddlewareResource<Metadata, Payload, FailResult>
    | SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult>;

export class SudoRPCService<Metadata, Payload, SuccessResult, FailResult> {

    public static create<Metadata, Payload, SuccessResult, FailResult>(
        serviceName: string,
    ): SudoRPCService<Metadata, Payload, SuccessResult, FailResult> {

        return new SudoRPCService<Metadata, Payload, SuccessResult, FailResult>(
            serviceName,
        );
    }

    private readonly _serviceName: string;

    private readonly _resources: Set<AvailableResource<Metadata, Payload, SuccessResult, FailResult>>;
    private readonly _satisfies: Map<string, WeakSet<AvailableResource<Metadata, Payload, SuccessResult, FailResult>>>;

    private constructor(
        serviceName: string,
    ) {

        this._serviceName = serviceName;

        this._resources = new Set();
        this._satisfies = new Map();
    }

    public get serviceName(): string {
        return this._serviceName;
    }

    public register(resource: AvailableResource<Metadata, Payload, SuccessResult, FailResult>): void {

        this._resources.add(resource);
        for (const satisfy of resource.satisfies) {

            if (!this._satisfies.has(satisfy)) {
                this._satisfies.set(satisfy, new WeakSet());
            }
            this._satisfies.get(satisfy)!.add(resource);
        }
    }

    public execute(call: SudoRPCCall<Metadata, Payload>): Promise<SudoRPCReturn<SuccessResult, FailResult>> | SudoRPCReturn<SuccessResult, FailResult> {

        return null as any;
    }
}
