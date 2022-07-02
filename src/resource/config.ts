/**
 * @author WMXPY
 * @namespace Resource
 * @description Config
 */

import { CreateEndpointResourceConfig, CreateMiddlewareResourceConfig } from "./declare";

export const fixCreateMiddlewareResourceConfig = (config?: Partial<CreateMiddlewareResourceConfig>): CreateMiddlewareResourceConfig => {

    const defaultConfig: CreateMiddlewareResourceConfig = {

        dependencies: [],
        satisfies: [],
    };

    if (typeof config !== 'object') {
        return defaultConfig;
    }

    return {

        ...defaultConfig,
        ...config,
    };
};

export const fixCreateEndpointResourceConfig = (config?: Partial<CreateEndpointResourceConfig>): CreateEndpointResourceConfig => {

    const defaultConfig: CreateEndpointResourceConfig = {

        dependencies: [],
        satisfies: [],
        exposed: false,
    };

    if (typeof config !== 'object') {
        return defaultConfig;
    }

    return {

        ...defaultConfig,
        ...config,
    };
};
