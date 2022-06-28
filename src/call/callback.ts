/**
 * @author WMXPY
 * @namespace Call
 * @description Callback
 */

import { SudoRPCReturnV1ErrorItem } from "../structure/return";

export class SudoRPCCallCallback<SuccessResult, FailResult> {

    public static create<SuccessResult, FailResult>(
        resolver: (result: SuccessResult) => void,
        rejecter: (errors: Array<SudoRPCReturnV1ErrorItem<FailResult>>) => void,
    ): SudoRPCCallCallback<SuccessResult, FailResult> {

        return new SudoRPCCallCallback<SuccessResult, FailResult>(
            resolver,
            rejecter,
        );
    }

    private readonly _resolver: (result: SuccessResult) => void;
    private readonly _rejecter: (errors: Array<SudoRPCReturnV1ErrorItem<FailResult>>) => void;

    private constructor(
        resolver: (result: SuccessResult) => void,
        rejecter: (errors: Array<SudoRPCReturnV1ErrorItem<FailResult>>) => void,
    ) {

        this._resolver = resolver;
        this._rejecter = rejecter;
    }

    public resolve(result: SuccessResult): void {

        this._resolver(result);
    }

    public reject(errors: Array<SudoRPCReturnV1ErrorItem<FailResult>>): void {

        this._rejecter(errors);
    }
}
