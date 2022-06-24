/**
 * @author WMXPY
 * @namespace Resource
 * @description Resource
 */

export class SudoRPCResource {

    public static create(
        identifier: string,
        dependencies: string[] = [],
        satisfies: string[] = [],
    ): SudoRPCResource {

        return new SudoRPCResource(identifier, dependencies, satisfies);
    }

    private readonly _identifier: string;
    private readonly _dependencies: string[];
    private readonly _satisfies: string[];

    private constructor(
        identifier: string,
        dependencies: string[] = [],
        satisfies: string[] = [],
    ) {
        this._identifier = identifier;
        this._dependencies = dependencies;
        this._satisfies = satisfies;
    }

    public get identifier(): string {
        return this._identifier;
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
