/**
 * @author WMXPY
 * @namespace Handler
 * @description Handler
 */

import { SudoRPCHandlerFunction } from "./declare";

export class SudoRPCHandler<Metadata, Payload> {

    public static create<Metadata, Payload>(
        identifier: string,
        handlerFunction: SudoRPCHandlerFunction<Metadata, Payload>,
        requirements: string[] = [],
        willSatisfyRequirements: string[] = [],
    ): SudoRPCHandler<Metadata, Payload> {

        return new SudoRPCHandler<Metadata, Payload>(
            identifier,
            handlerFunction,
            requirements,
            willSatisfyRequirements,
        );
    }

    private readonly _identifier: string;
    private readonly _handlerFunction: SudoRPCHandlerFunction<Metadata, Payload>;
    private readonly _requirements: string[];
    private readonly _willSatisfyRequirements: string[];

    private constructor(
        identifier: string,
        handlerFunction: SudoRPCHandlerFunction<Metadata, Payload>,
        requirements: string[],
        willSatisfyRequirements: string[],
    ) {
        this._identifier = identifier;
        this._handlerFunction = handlerFunction;
        this._requirements = requirements;
        this._willSatisfyRequirements = willSatisfyRequirements;
    }
}
