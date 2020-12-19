import * as middleware from '../middleware'
import {injectClient} from './injectClient'
import Framework, {Webpack} from '@roots/bud-typings'
import {express} from '@roots/bud-support'

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
  public constructor(bud: Framework.Bud) {
    this.bud = bud.get

    this.instance = express()
    this.instance.set('x-powered-by', false)

    this.config = bud.makeContainer({})
  }

  public init(): void {
    return
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
  public run(): this {
    this.running = true

    const bud = this.bud()
    const config = this.config.all()

    bud.config.mutate('entry', (entry: Webpack.Entry) =>
      injectClient(entry),
    )

    this.instance.use(
      middleware.dev({
        config,
        compiler: bud.compiler.instance,
      }),
    )

    this.instance.use(middleware.hot(bud.compiler.instance))

    bud.features.enabled('proxy') &&
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
