import * as middleware from '../middleware'
import {injectClient} from './injectClient'
import express from 'express'
import type Webpack from 'webpack'
import Framework from '@roots/bud-typings'

export {Server, Server as default}

/**
 * ## bud.server
 *
 * Development server for the @roots/bud framework.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-server)
 * [🔗 Documentation](#)
 */
class Server implements Framework.Server.Contract {
  /**
   * Bud instance ref
   */
  public bud: Framework.Bud.Ref

  /**
   * Express application instance.
   */
  public instance: Framework.Server.Instance

  /**
   * Constructor
   */
  public constructor(bud: Framework.Bud.Contract) {
    this.bud = bud.get
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
  public run(callback?: () => void): this {
    const bud = this.bud()

    bud.compiler.compile()

    bud.config.mutate('entry', (entry: Webpack.Entry) =>
      injectClient(entry),
    )

    this.instance.use(
      middleware.dev({
        compiler: bud.compiler.get(),
        config: bud.serverConfig.getStore(),
      }),
    )

    this.instance.use(middleware.hot(bud.compiler.get()))

    bud.features.enabled('proxy') &&
      this.instance.use(
        middleware.proxy(bud.serverConfig.getStore()),
      )

    this.listen(callback)

    return this
  }

  /**
   * ## bud.server.listen [🏠 Internal]
   *
   * Listen for connections.
   */
  public listen(callback?: () => void): void {
    const bud = this.bud()

    this.instance.listen(
      bud.serverConfig.has('port')
        ? bud.serverConfig.get('port')
        : 3000,
      bud.serverConfig.has('host')
        ? bud.serverConfig.get('host')
        : 'localhost',
      callback ??
        function () {
          return null
        },
    )
  }
}
