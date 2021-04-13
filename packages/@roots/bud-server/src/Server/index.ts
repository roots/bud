import {Service} from '@roots/bud-framework'
import {Server} from '@roots/bud-typings'
import {bind, globby, chokidar} from '@roots/bud-support'

import {FSWatcher} from 'fs-extra'
import {resolve} from 'path'

import * as middleware from '../middleware'
import {injectClient} from '../util/injectClient'

/**
 * Development Server
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/bud-server](https://github.com/roots/bud/tree/stable/packages/@roots/bud-server)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-server)
 */
export default class extends Service implements Server {
  /**
   * Service name
   */
  public name = '@roots/bud-server'

  /**
   * Middlewares
   */
  public middleware: Server.Middleware.Inventory = {}

  /**
   * Watcher
   */
  public _watcher: FSWatcher

  public get watcher() {
    return this._watcher
  }

  public set watcher(watcher: FSWatcher) {
    this._watcher = watcher
  }

  /**
   * Server application instance.
   */
  public _instance: Server.Instance

  public get instance() {
    return this._instance
  }

  public set instance(instance) {
    this._instance = instance
  }

  /**
   * Config
   */
  public _config: Server.Config

  public get config(): Server.Config {
    return this._config
  }

  public set config(config: Server.Config) {
    this._config = config
  }

  /**
   * Watchlist
   */
  public readonly _watchlist: string[]

  /**
   * Watchlist: get accessor
   */
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

  /**
   * Assets
   */
  public readonly _assets = [
    resolve(__dirname, '../client/index.js'),
  ]

  public get assets() {
    return this._assets
  }

  /**
   * Watchable: get accessor
   */
  public get watchable(): boolean {
    return (
      Array.isArray(this.watchlist) && this.watchlist.length > 0
    )
  }

  /**
   * Lifecycle: booted
   */
  public booted() {
    this.watcher = chokidar.watch(
      globby.sync(this.watchlist),
      this.config.get('watch.options'),
    )
  }

  /**
   * Process middlewares
   */
  @bind
  public processMiddlewares(compiler: Server.Compiler) {
    Object.entries(middleware).map(([key, generate]) => {
      if (this.config.enabled(`middleware.${key}`)) {
        this.info(`Enabling ${key}`)

        this.middleware[key] = generate({
          config: this.config,
          compiler,
        })
      }
    })

    Object.values(this.middleware).forEach(middleware =>
      this.instance.use(middleware),
    )
  }

  /**
   * Run server
   */
  @bind
  public run(compiler: Server.Compiler): this {
    /**
     * __roots route
     */
    this.instance
      .route('/__roots/config.json')
      .get((req, res) => {
        res.send({
          ...this.app.store.all(),
          ...this.config.all(),
        })

        res.end()
      })

    this.processMiddlewares(compiler)

    /**
     * Listen
     */
    this.instance.listen(this.config.get('port'), () => {
      this.info(
        `Server listening on %s`,
        this.config.get('port'),
      )

      this.info({
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
  @bind
  public inject(): void {
    injectClient(this.app, this.assets)
  }
}
