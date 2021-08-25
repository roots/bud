/// <reference types="node" />
import { SpawnSyncReturns } from 'child_process';
export { Npm } from './npm';
export { Yarn } from './yarn';
export { Dependencies } from './dependencies';
export interface IDependencyManager {
    install(dev: boolean, dependency: string): SpawnSyncReturns<string>;
    uninstall(dependency: string): SpawnSyncReturns<string>;
}
//# sourceMappingURL=index.d.ts.map