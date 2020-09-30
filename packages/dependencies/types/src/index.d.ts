/// <reference types="node" />
import { SpawnSyncReturns } from 'child_process';
import Npm from './npm';
import Yarn from './yarn';
import Dependencies from './dependencies';
export interface IDependencyManager {
    install(dev: boolean): SpawnSyncReturns<string>;
    uninstall(): SpawnSyncReturns<string>;
}
export { Dependencies as default, Npm, Yarn };
//# sourceMappingURL=index.d.ts.map