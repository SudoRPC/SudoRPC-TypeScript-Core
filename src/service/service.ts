/**
 * @author WMXPY
 * @namespace Service
 * @description Service
 */

import { SudoRPCResource } from "../resource/resource";
import { SudoRPCCall } from "../structure/call";
import { SudoRPCReturn } from "../structure/return";

export class SudoRPCService<Metadata, Payload, SuccessResult, FailResult> {

    public static create<Metadata, Payload, SuccessResult, FailResult>(
        serviceName: string,
    ): SudoRPCService<Metadata, Payload, SuccessResult, FailResult> {

        return new SudoRPCService<Metadata, Payload, SuccessResult, FailResult>(
            serviceName,
        );
    }

    private readonly _serviceName: string;

    private readonly _resources: Set<SudoRPCResource<Metadata, Payload, SuccessResult, FailResult>>;
    private readonly _satisfies: Map<string, WeakSet<SudoRPCResource<Metadata, Payload, SuccessResult, FailResult>>>;

    private constructor(
        serviceName: string,
    ) {

        this._serviceName = serviceName;

        this._resources = new Set();
        this._satisfies = new Map();
    }

    public register(resource: SudoRPCResource<Metadata, Payload, SuccessResult, FailResult>): void {

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
