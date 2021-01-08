/// <reference types="node" />
import { SpawnSyncReturns } from 'child_process';
import Dependencies from './dependencies';
import { IDependencyManager } from './';
declare class Yarn extends Dependencies implements IDependencyManager {
    install(dev: boolean): SpawnSyncReturns<string>;
    uninstall(): SpawnSyncReturns<string>;
}
export { Yarn as default };
//# sourceMappingURL=yarn.d.ts.map