/**
 * @author WMXPY
 * @namespace Resource
 * @description Endpoint Resource
 */

export class SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult> {

    public static create<Metadata, Payload, SuccessResult, FailResult>(
        resourceName: string,
        dependencies: string[] = [],
        satisfies: string[] = [],
    ): SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult> {

        return new SudoRPCEndpointResource<Metadata, Payload, SuccessResult, FailResult>(
            resourceName,
            dependencies,
            satisfies,
        );
    }

    private readonly _resourceName: string;

    private readonly _dependencies: string[];
    private readonly _satisfies: string[];

    private constructor(
        resourceName: string,
        dependencies: string[],
        satisfies: string[],
    ) {

        this._resourceName = resourceName;

        this._dependencies = dependencies;
        this._satisfies = satisfies;
    }

    public get resourceName(): string {
        return this._resourceName;
    }

    public get dependencies(): string[] {
        return this._dependencies;
    }

    public get satisfies(): string[] {
        return this._satisfies;
    }

    public addDependency(dependency: string): void {
        this._dependencies.push(dependency);
    }

    public addSatisfy(satisfy: string): void {
        this._satisfies.push(satisfy);
    }
}
