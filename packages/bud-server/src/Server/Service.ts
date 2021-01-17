import {Service} from '@roots/bud-framework'
import type {Server} from '@roots/bud-typings'

/**
 * ## Server service provider.
 *
 * Bud provides a system of 'hooks' to expose values
 * for easier modification.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-hooks)
 * [🔗 Documentation](#)
 */
export default abstract class extends Service implements Server {
  public abstract instance: Server.Instance
  /**
   * Inject HMR service into individual bundles.
   */
  public abstract injectHmr(): void

  /**
   * ## bud.server.run [🏠 Internal]
   *
   * Run the development server.
   *
   * Projects should use `bud.run` unless they want
   * to supply their own Webpack stats handler.
   *
   * ### Usage
   *
   * ```js
   * bud.server.run((err, stats) => {
   *  // ...
   * })
   * ```
   */
  public abstract run(compiler: any): this
}
