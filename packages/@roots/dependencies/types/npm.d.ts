/// <reference types="node" />
import {SpawnSyncReturns} from 'child_process'
import {IDependencyManager} from './'
export declare class Npm implements IDependencyManager {
  path: string
  constructor(path?: string)
  install(
    dev: boolean,
    dependency: string,
  ): SpawnSyncReturns<string>
  uninstall(dependency: string): SpawnSyncReturns<string>
}
//# sourceMappingURL=npm.d.ts.map
