import type {
  Webpack,
  Container,
  Server,
} from '@roots/bud-typings'
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
  public instance: Server.Instance

  /**
   * Client bundle assets (for injection)
   */
  public assets = [resolve(__dirname, '../client/index.js')]

  /**
   * Middleware
   */
  public middleware: {[key: string]: any} = {}

  public _watchlist: string[]

  /**
   * Service registration
   */
  public register(): void {
    this.run = this.run.bind(this)
    this.instance = this.instance.bind(this)
  }

  /**
   * Server config values
   */
  public get config(): Container<Server.Options> {
    return this.app.makeContainer(this.app.store.get('server'))
  }

  /**
   * Run server
   */
  public run(compiler: Webpack.Compiler): this {
    if (this.config.enabled('middleware.dev')) {
      this.middleware.dev = middleware.dev({
        config: this.config,
        compiler,
      })
      this.instance.use(this.middleware.dev)
    }

    if (this.config.enabled('middleware.hot')) {
      this.middleware.hot = middleware.hot(compiler)
      this.instance.use(this.middleware.hot)
    }

    if (this.config.enabled('middleware.proxy')) {
      this.middleware.proxy = middleware.proxy(this.config)
      this.instance.use(this.middleware.proxy)
    }

    this.instance.listen(this.config.get('port'))

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
      .map(f => this.app.get().project(f))
  }

  public get watchable(): boolean {
    return (
      Array.isArray(this.watchlist) && this.watchlist.length > 0
    )
  }
}
