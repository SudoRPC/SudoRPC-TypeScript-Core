/**
 * @author WMXPY
 * @namespace Call
 * @description Process Manager
 */

export class SudoRPCCallProcessManager {

    private readonly _notExecuted: Set<string>;
    private readonly _satisfiedRequirements: Set<string>;

    private constructor(
        handlerIdentifiers: string[],
    ) {

        this._notExecuted = new Set<string>(handlerIdentifiers);
        this._satisfiedRequirements = new Set<string>();
    }
}
