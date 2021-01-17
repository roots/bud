import Service from './Service'
import {injectClient} from '../util/injectClient'
import * as middleware from '../middleware'
import type {
  Webpack,
  Container,
  Server,
} from '@roots/bud-typings'

/**
 * ## bud.server
 *
 * Development server.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-server)
 * [🔗 Documentation](#)
 */
export default class extends Service implements Server {
  /**
   * Application dev server instance.
   */
  public instance: Server.Instance

  /**
   * Service registration
   */
  public register(): void {
    this.run = this.run.bind(this)
    this.instance = this.instance.bind(this)
  }

  /**
   * Service boot
   */
  public boot(): void {
    //
  }

  public get config(): Container<Server.Options> {
    return this.app.makeContainer(this.app.store.get('server'))
  }

  /**
   * Inject HMR
   */
  public injectHmr(): void {
    injectClient(this.app)
  }

  /**
   * Run server
   */
  public run(compiler: Webpack.Compiler): this {
    const config = this.config

    this.instance.use(
      middleware.dev({
        config,
        compiler,
      }),
    )

    this.instance.use(middleware.hot(compiler))

    this.app.options.enabled('proxy') &&
      this.instance.use(middleware.proxy(this.config))

    this.instance.listen(this.config.get('port'))

    return this
  }
}
