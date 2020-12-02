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
   * Server config
   */
  public config: Framework.Container

  /**
   * Is server running
   */
  public running = false

  /**
   * Constructor
   */
  public constructor(bud: Framework.Bud.Contract) {
    this.bud = bud.get
    this.instance = express()
    this.instance.set('x-powered-by', false)
    this.config = bud.makeContainer({})
  }

  /**
   * ## bud.server.getConfig [🏠 Internal]
   *
   * Get the server config.
   *
   * ### Usage
   *
   * ```js
   * bud.server.getConfig()
   * ```
   */
  public getConfig(): Framework.Container['repository'] {
    return this.config.getStore()
  }

  /**
   * ## bud.server.setConfig [🏠 Internal]
   *
   * Set the server config.
   *
   * ### Usage
   *
   * ```js
   * bud.server.setConfig(config)
   * ```
   */
  public setConfig(
    config: Framework.Container['repository'],
  ): void {
    this.config.setStore(config)
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
    this.running = true

    this.bud().config.mutate('entry', (entry: Webpack.Entry) =>
      injectClient(entry),
    )
    this.bud().compiler.compile()

    this.instance.use(
      middleware.dev({
        compiler: this.bud().compiler.get(),
        config: this.config.getStore(),
      }),
    )

    this.instance.use(middleware.hot(this.bud().compiler.get()))

    this.bud().features.enabled('proxy') &&
      this.instance.use(middleware.proxy(this.config.getStore()))

    this.listen(callback)

    return this
  }

  /**
   * ## bud.server.listen [🏠 Internal]
   *
   * Listen for connections.
   */
  public listen(callback?: () => void): void {
    this.instance.listen(
      this.config.has('proxy.port')
        ? this.config.get('proxy.port')
        : 3000,
    )
  }
}
