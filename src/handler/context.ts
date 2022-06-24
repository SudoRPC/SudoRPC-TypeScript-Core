/**
 * @author WMXPY
 * @namespace Handler
 * @description Context
 */

export class SudoRPCHandlerContext<Metadata, Payload> {

    private readonly _metadata: Metadata;
    private readonly _payload: Payload;

    private readonly _identifier: string;
}
