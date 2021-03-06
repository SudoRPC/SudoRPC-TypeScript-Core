/**
 * @author WMXPY
 * @namespace Planner
 * @description Declare
 */

import { SudoRPCEndpointResource } from "../resource/endpoint-resource";
import { SudoRPCMiddlewareResource } from "../resource/middleware-resource";

export type AvailableResource<Metadata, Payload, SuccessResult, FailResult> =
    | SudoRPCMiddlewareResource<Metadata, Payload, FailResult>
    | SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult>;

export enum SUDORPC_PLAN_EXECUTE_STEP_REASON {

    CALL = 'CALL',
    DEPENDENCY = 'DEPENDENCY',
}

export type SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult> =
    | SudoRPCExecutionPlanCallStep<Metadata, Payload, SuccessResult, FailResult>
    | SudoRPCExecutionPlanDependencyStep<Metadata, Payload, SuccessResult, FailResult>;

export type SudoRPCExecutionPlanCallStep<Metadata, Payload, SuccessResult, FailResult> = {

    readonly reason: SUDORPC_PLAN_EXECUTE_STEP_REASON.CALL;

    readonly resource: AvailableResource<Metadata, Payload, SuccessResult, FailResult>;
};

export type SudoRPCExecutionPlanDependencyStep<Metadata, Payload, SuccessResult, FailResult> = {

    readonly reason: SUDORPC_PLAN_EXECUTE_STEP_REASON.DEPENDENCY;
    readonly dependencyOf: string;

    readonly resource: AvailableResource<Metadata, Payload, SuccessResult, FailResult>;
};

export enum SUDORPC_EXECUTE_PLAN_NOT_SATISFIED_REASON {

    DEPENDENCY_NOT_FOUND = 'DEPENDENCY_NOT_FOUND',
    DEPENDENCY_INFINITE_LOOP = 'DEPENDENCY_INFINITE_LOOP',
    RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',

    CANNOT_CALL_NOT_ENDPOINT_RESOURCE = 'CANNOT_CALL_NOT_ENDPOINT_RESOURCE',

    UNKNOWN = 'UNKNOWN',
}

export type SudoRPCExecutionNotSatisfiedPlan =
    | {

        readonly reason: SUDORPC_EXECUTE_PLAN_NOT_SATISFIED_REASON.DEPENDENCY_NOT_FOUND;
        readonly dependency: string;
    }
    | {

        readonly reason: SUDORPC_EXECUTE_PLAN_NOT_SATISFIED_REASON.DEPENDENCY_INFINITE_LOOP;
        readonly dependency: string;
    }
    | {

        readonly reason: SUDORPC_EXECUTE_PLAN_NOT_SATISFIED_REASON.RESOURCE_NOT_FOUND;
        readonly resource: string;
    }
    | {

        readonly reason: SUDORPC_EXECUTE_PLAN_NOT_SATISFIED_REASON.CANNOT_CALL_NOT_ENDPOINT_RESOURCE;
        readonly resource: string;
    }
    | {

        readonly reason: SUDORPC_EXECUTE_PLAN_NOT_SATISFIED_REASON.UNKNOWN;
    };

export type SudoRPCExecutionPlan<Metadata, Payload, SuccessResult, FailResult> =
    | {

        readonly satisfiable: true;
        readonly steps: Array<SudoRPCExecutionPlanStep<Metadata, Payload, SuccessResult, FailResult>>;
    }
    | ({

        readonly satisfiable: false;
    } & SudoRPCExecutionNotSatisfiedPlan);
