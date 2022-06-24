/**
 * @author WMXPY
 * @namespace Service
 * @description Service
 */

import { SudoRPCResource } from "../resource/resource";

export class SudoRPCService {

    private readonly _resources: Set<SudoRPCResource>;
    private readonly _satisfies: Map<string, WeakSet<SudoRPCResource>>;

    private constructor() {

        this._resources = new Set();
        this._satisfies = new Map();
    }

    public register(resource: SudoRPCResource): void {

        this._resources.add(resource);
        for (const satisfy of resource.satisfies) {

            if (!this._satisfies.has(satisfy)) {
                this._satisfies.set(satisfy, new WeakSet());
            }
            this._satisfies.get(satisfy)!.add(resource);
        }
    }
}
