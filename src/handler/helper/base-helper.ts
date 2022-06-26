/**
 * @author WMXPY
 * @namespace Handler_Helper
 * @description Base Helper
 */

import { SudoRPCCall } from "../../structure/call";

export abstract class SudoRPCBaseHandlerHelper<Metadata, Payload> {

    protected readonly _call: SudoRPCCall<Metadata, Payload>;

    protected constructor(
        call: SudoRPCCall<Metadata, Payload>,
    ) {

        this._call = call;
    }
}
