/**
 * @author WMXPY
 * @namespace Service_Error
 * @description Declare
 */

export type ErrorGeneratorCreateErrorOption<FailResult> = {

    readonly error: string;
    readonly message: string;
    readonly result: FailResult;
};

export type ErrorGeneratorCreateInternalErrorOption = {

    readonly error: string;
    readonly message: string;
};
