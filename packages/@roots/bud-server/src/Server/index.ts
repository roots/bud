import type {Webpack, Server} from '@roots/bud-typings'
import {Service} from '@roots/bud-framework'
import {injectClient} from '../util/injectClient'
import * as middleware from '../middleware'
import {globby, chokidar} from '@roots/bud-support'
import {resolve} from 'path'
import {FSWatcher} from 'fs-extra'

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
  public _instance: Server.Instance

  /**
   * Config
   */
  public _config: Server.Config

  /**
   * Client bundle assets (for injection)
   */
  public assets = [resolve(__dirname, '../client/index.js')]

  /**
   * Middleware
   */
  public middleware: {[key: string]: any} = {}

  /**
   * Watchlist
   */
  public _watchlist: string[]

  /**
   * Instance getter
   */
  public get instance() {
    return this._instance
  }

  /**
   * Instance setter
   */
  public set instance(instance) {
    this._instance = instance
  }

  /**
   * Config getter
   */
  public get config(): Server.Config {
    return this._config
  }

  /**
   * Config setter
   */
  public set config(config: Server.Config) {
    this._config = config
  }

  /**
   * Service boot
   */
  public boot(): void {
    this.run = this.run.bind(this)
    this.instance = this.instance.bind(this)
  }

  /**
   * Run server
   */
  public run(compiler: Webpack.Compiler): this {
    if (this.config.enabled('middleware.dev')) {
      this.info(`Enabling dev middleware`)

      this.middleware.dev = middleware.dev({
        config: this.config,
        compiler,
      })

      this.instance.use(this.middleware.dev)
    }

    if (this.config.enabled('middleware.hot')) {
      this.info(`Enabling hot middleware`)

      this.middleware.hot = middleware.hot(compiler)
      this.instance.use(this.middleware.hot)
    }

    if (this.config.enabled('middleware.proxy')) {
      this.info(`Enabling proxy middleware`)

      this.middleware.proxy = middleware.proxy(this.config)
      this.instance.use(this.middleware.proxy)
    }

    this.instance.listen(this.config.get('port'), () => {
      this.info(
        `Server listening on %s`,
        this.config.get('port'),
      )

      this.debug({
        ...this.config.all(),
        middleware,
      })
    })

    this.watchable &&
      this.watcher?.on('change', path => {
        this.middleware.hot.publish({
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

  public get watcher(): FSWatcher {
    return chokidar.watch(
      globby.sync(this.watchlist),
      this.config.get('watch.options'),
    )
  }

  public get watchlist(): string[] {
    return this.config
      .get('watch.files')
      .map((file: string) =>
        this.path.posix.join(
          this.app.subscribe('location/project', this.name),
          file,
        ),
      )
  }

  public get watchable(): boolean {
    return (
      Array.isArray(this.watchlist) && this.watchlist.length > 0
    )
  }
}
