import Service from './Service'

import {express} from '@roots/bud-support'
import * as middleware from '../middleware'
import {injectClient} from '../util/injectClient'

import type {Server, Webpack} from '@roots/bud-typings'

/**
 * ## bud.server
 *
 * Express development server.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-server)
 * [🔗 Documentation](#)
 */
export default class extends Service implements Server {
  /**
   * Class initializer.
   */
  public init(): void {
    this.instance = express()
    this.instance.set('x-powered-by', false)
  }

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
  public run(): this {
    const config = this.config.all()

    this.app.config.mutate('entry', (entry: Webpack.Entry) =>
      injectClient(entry),
    )

    this.instance.use(
      middleware.dev({
        config,
        compiler: this.app.compiler.instance,
      }),
    )

    this.instance.use(middleware.hot(this.app.compiler.instance))

    this.app.features.enabled('proxy') &&
      this.instance.use(middleware.proxy(config))

    this.listen()

    return this
  }

  /**
   * ## bud.server.listen [🏠 Internal]
   *
   * Listen for connections.
   */
  public listen(): void {
    this.instance.listen(
      this.config.get('port'),
      this.config.get('host'),
    )
  }
}
