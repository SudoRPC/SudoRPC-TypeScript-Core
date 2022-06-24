/**
 * @author WMXPY
 * @namespace Service
 * @description Service
 */

import { SudoRPCResource } from "../resource/resource";

export class SudoRPCService<Metadata, Payload, SuccessResult, FailResult> {

    public static create<Metadata, Payload, SuccessResult, FailResult>(
        identifier: string,
    ): SudoRPCService<Metadata, Payload, SuccessResult, FailResult> {

        return new SudoRPCService<Metadata, Payload, SuccessResult, FailResult>(
            identifier,
        );
    }

    private readonly _identifier: string;

    private readonly _resources: Set<SudoRPCResource<Metadata, Payload, SuccessResult, FailResult>>;
    private readonly _satisfies: Map<string, WeakSet<SudoRPCResource<Metadata, Payload, SuccessResult, FailResult>>>;

    private constructor(
        identifier: string,
    ) {

        this._identifier = identifier;

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
}
