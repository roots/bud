import {SpawnSyncReturns} from 'child_process'

/**
 * ## bud.dependencies
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export interface Dependencies {
  install(dev: boolean): SpawnSyncReturns<string>
  uninstall(): SpawnSyncReturns<string>
}
