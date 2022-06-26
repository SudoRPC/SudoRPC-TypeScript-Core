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
        | SudoRPCReturnV1Error<FailResult>
    );

export type SudoRPCReturnV1Base = {

    readonly version: "1.0";

    readonly identifier: string;
};

export type SudoRPCReturnV1Success<SuccessResult> = {

    readonly success: true;

    readonly result: SuccessResult;
};

export type SudoRPCReturnV1Error<FailResult> = {

    readonly success: false;

    readonly errors: Array<SudoRPCReturnV1ErrorItem<FailResult>>;
};

export type SudoRPCReturnV1ErrorItem<FailResult> =
    | SudoRPCReturnV1Fail<FailResult>
    | SudoRPCReturnV1InternalError;

export type SudoRPCError = {

    readonly error: string;
    readonly message: string;
};

export type SudoRPCReturnV1Fail<FailResult> = {

    readonly isInternalError: false;

    readonly result: FailResult;
} & SudoRPCError;

export type SudoRPCReturnV1InternalError = {

    readonly isInternalError: true;
} & SudoRPCError;
