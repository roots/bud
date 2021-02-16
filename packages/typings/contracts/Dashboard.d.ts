import type {Framework, Instance} from './'
/**
 * ## bud.cli
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export type {Error} from '../../bud-cli/src/Error'

export interface Dashboard extends Framework.Service {
  /**
   * CLI instance
   */
  dashboard: Instance

  /**
   * Register service
   */
  register(): void

  /**
   * Mount CLI
   */
  run(): void

  /**
   * Unmount CLI
   */
  kill(): void
}
