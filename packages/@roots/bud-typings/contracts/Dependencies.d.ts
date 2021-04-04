import {Service} from './'

/**
 * ## bud.dependencies
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export interface Dependencies extends Service {
  name: string

  installDev(dependencies: string[], source: string): void

  install(dependencies: string[], source: string): void
}
