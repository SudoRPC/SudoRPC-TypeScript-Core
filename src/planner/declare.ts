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
