import * as Framework from '@roots/bud-framework'
import Express from 'express'
import {URL} from 'url'

import * as middleware from '../middleware'
import {injectClient} from '../util/injectClient'
import {bind, chokidar, globby} from './server.dependencies'
import type {Watcher} from './server.interface'

/**
 * Server service class
 *
 * @public
 */
export class Server
  extends Framework.Service
  implements Framework.Server.Interface
{
  /**
   * @internal
   */
  public _assets = [`@roots/bud-server/client.js`]

  /**
   * Express instance
   *
   * @public
   */
  public application: Framework.Server.Application

  /**
   * Server config accessor
   *
   * @public
   */
  public get config(): Framework.Server.Configuration {
    return this.app.store.get('server')
  }

  /**
   * Express instance
   *
   * @public
   */
  public instance: Framework.Server.Instance

  /**
   * Utilized middleware
   *
   * @public
   */
  public middleware: Framework.Server.Middleware = {}

  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.watcher}
   *
   * @public
   */
  public watcher: Watcher

  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.assets}
   *
   * @public
   */
  public get assets() {
    return this._assets
  }
  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.assets}
   *
   * @public
   */
  public set assets(assets: Array<string>) {
    this._assets = assets
  }

  /**
   * Service register callback
   *
   * @internal
   */
  public async bootstrap(): Promise<void> {
    this.application = Express()
  }

  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.getWatchedFilesArray}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async getWatchedFiles(): Promise<Array<string>> {
    const [files, options] =
      this.app.store.getValues('server.watch')

    if (!files?.length) return []

    const globResults = await globby(
      files.map((file: string) =>
        this.app.path('project', file),
      ),
      options,
    )

    return globResults as unknown as Array<string>
  }

  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.processMiddlewares}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public processMiddlewares() {
    this.middleware = Object.entries(middleware)
      .filter(([k, v]) => {
        if (this.app.store.is(`server.middleware.${k}`, true)) {
          this.log('log', `middleware ${k} is enabled.`)
          return true
        }

        return false
      })
      .reduce((acc, [key, generate]) => {
        const middleware = generate(this.app)

        this.log(`info`, `configured middleware: ${key}`)

        this.application.use(middleware)

        return {...acc, [key]: middleware}
      }, {})
  }

  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.run}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async run(): Promise<this> {
    this.app.hooks.on('build.output.publicPath', () => `/`)

    await this.app.hooks.filterAsync<'event.server.before'>(
      'event.server.before',
      this.app,
    )
    await this.app.compiler.compile()

    this.processMiddlewares()

    /**
     * __roots route
     */
    this.application
      .route('/__bud/config.json')
      .get((_req, res) => {
        res.send({
          name: this.app.name,
          hmr: `/__bud/hmr`,
        })

        res.end()
      })

    /**
     * Listen
     */
    const url = new URL(this.app.store.get('server.dev.url'))
    this.log('info', `starting server on %s`, url.port)

    this.instance = this.application.listen(
      url.port,
      async (error: string) => {
        if (error) this.log('error', error)

        this.app.hooks.filter('event.server.listen')

        this.log(
          'success',
          'listening on %s',
          JSON.stringify(this.instance.address()),
        )
      },
    )

    /**
     * Initialize Watcher
     */
    const watchFiles = await this.getWatchedFiles()
    if (watchFiles.length) {
      watchFiles.forEach(file => {
        this.log('log', `watching`, file, `for changes`)
      })
      this.watcher = chokidar.watch(watchFiles)
    }

    /**
     * If watching and a file it is watching
     * is touched, reload the window.
     */
    this.watcher?.on &&
      this.watcher.on('change', path => {
        this.middleware?.hot?.publish({
          action: 'reload',
          message: `Detected file change: ${path}. Reloading window.`,
        })
      })

    await this.app.hooks.filterAsync<'event.server.after'>(
      'event.server.after',
      this.app,
    )

    return this
  }

  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.inject}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async inject(): Promise<void> {
    await injectClient(this.app, this.assets)
  }

  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.inject}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public close(): void {}
}
