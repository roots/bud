/// <reference types="node" />
import {SpawnSyncReturns} from 'child_process'
import Dependencies from './dependencies'
import {IDependencyManager} from './'
declare class Npm
  extends Dependencies
  implements IDependencyManager {
  install(dev: boolean): SpawnSyncReturns<string>
  uninstall(): SpawnSyncReturns<string>
}
export {Npm as default}
//# sourceMappingURL=npm.d.ts.map
