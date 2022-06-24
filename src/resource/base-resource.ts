/**
 * @author WMXPY
 * @namespace Resource
 * @description Base Resource
 */

export abstract class SudoRPCBaseResource {

    private readonly _resourceName: string;

    private readonly _dependencies: string[];
    private readonly _satisfies: string[];

    protected constructor(
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
