/// <reference types="node" />
import { SpawnSyncReturns } from 'child_process';
import { IDependencyManager } from './';
export declare class Yarn implements IDependencyManager {
    path: string;
    constructor(path?: string);
    install(dev: boolean, dependency: string): SpawnSyncReturns<string>;
    uninstall(dependency: string): SpawnSyncReturns<string>;
}
//# sourceMappingURL=yarn.d.ts.map