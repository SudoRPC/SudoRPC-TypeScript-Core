/**
 * @author WMXPY
 * @namespace Structure
 * @description Return
 */

export type SudoRPCReturn<SuccessResult, FailResult> =
    | SudoRPCReturnV1<SuccessResult, FailResult>;

export type SudoRPCReturnV1<SuccessResult, FailResult> =
    SudoRPCReturnV1Base
    & (
        | SudoRPCReturnV1Success<SuccessResult>
        | SudoRPCReturnV1Fail<FailResult>
    );

export type SudoRPCReturnV1Base = {

    readonly version: "1.0";

    readonly identifier: string;
};

export type SudoRPCReturnV1Success<SuccessResult> = {

    readonly success: true;

    readonly result: SuccessResult;
};

export type SudoRPCReturnV1Fail<FailResult> = {

    readonly success: false;

    readonly error: string;
    readonly message: string;

    readonly result: FailResult;
};
