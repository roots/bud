import type {
  Webpack,
  Container,
  Server,
} from '@roots/bud-typings'
import Service from './Service'
import {injectClient} from '../util/injectClient'
import * as middleware from '../middleware'
import {globby, chokidar} from '@roots/bud-support'
import {resolve} from 'path'

/**
 * ## bud.server
 *
 * Development server.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/bud-server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-server)
 */
export default class extends Service implements Server {
  /**
   * Service ident.
   */
  public name = '@roots/bud-server'

  /**
   * Application dev server instance.
   */
  public instance: Server.Instance

  /**
   * Client bundle assets (for injection)
   */
  public assets = [resolve(__dirname, '../client/index.js')]

  /**
   * Middlewares
   */
  public middlewares = {
    dev: null,
    hot: null,
    proxy: null,
    budClient: null,
  }

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

  /**
   * Server config values
   */
  public get config(): Container<Server.Options> {
    return this.app.makeContainer(this.app.store.get('server'))
  }

  /**
   * Express middlewares
   */
  public makeMiddleware(compiler: Webpack.Compiler): void {
    Object.assign(this.middlewares, {
      dev: middleware.dev({
        config: this.config,
        compiler,
      }),
      hot: middleware.hot(compiler),
      proxy: middleware.proxy(this.config),
    })
  }

  /**
   * Run server
   */
  public run(compiler: Webpack.Compiler): this {
    this.makeMiddleware(compiler)

    this.instance.use(this.middlewares.dev)
    this.instance.use(this.middlewares.hot)

    this.app.options.enabled('proxy') &&
      this.instance.use(this.middlewares.proxy)

    this.instance.listen(this.config.get('port'))

    this.watcher.on('change', path => {
      this.middlewares.hot.publish({
        action: 'reload',
        message: `Detected file change: ${path}. Reloading window.`,
      })
    })

    return this
  }

  /**
   * Inject HMR
   */
  public inject(): void {
    injectClient(this.app, this.assets)
  }

  /**
   * Watch fs
   */
  public get watcher() {
    return chokidar.watch(
      globby.sync(
        this.config
          .get('watchFiles')
          .map(file => this.app.get().project(file)),
      ),
      {persistent: true},
    )
  }
}
