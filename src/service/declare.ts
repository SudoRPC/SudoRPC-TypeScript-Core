/**
 * @author WMXPY
 * @namespace Service
 * @description Declare
 */

import { AvailableResource } from "../planner/declare";

export interface ISudoRPCService<Metadata, Payload, SuccessResult, FailResult> {

    register(resource: AvailableResource<Metadata, Payload, SuccessResult, FailResult>):
        ISudoRPCService<Metadata, Payload, SuccessResult, FailResult>;

    useMixin(mixin: SudoRPCServiceMixin<Metadata, Payload, SuccessResult, FailResult>):
        ISudoRPCService<Metadata, Payload, SuccessResult, FailResult>;
}

export type SudoRPCServiceMixin<Metadata, Payload, SuccessResult, FailResult> = (
    service: ISudoRPCService<Metadata, Payload, SuccessResult, FailResult>,
) => void;

export type SudoRPCServiceConfiguration = {

    readonly noParallel: boolean;
};

export const DefaultSudoRPCServiceConfiguration: SudoRPCServiceConfiguration = {

    noParallel: false,
};
