import {Service} from '@roots/bud-framework'
import {Server} from '@roots/bud-typings'
import {globby, chokidar} from '@roots/bud-support'

import {FSWatcher} from 'fs-extra'
import {resolve} from 'path'

import * as middleware from '../middleware'
import {injectClient} from '../util/injectClient'

/**
 * Development Server
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
   * Middleware
   */
  public middleware: Server.Middleware.Inventory = {}

  /**
   * Watchlist
   */
  public _watchlist: string[]

  /**
   * Server application instance.
   */
  public _instance: Server.Instance

  /**
   * Config
   */
  public _config: Server.Config

  /**
   * Assets
   */
  public assets = [resolve(__dirname, '../client/index.js')]

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
  public run(compiler: Server.Compiler): this {
    const processMiddlewares = () => {
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

    processMiddlewares()

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
      })

    /**
     * Listen
     */
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
