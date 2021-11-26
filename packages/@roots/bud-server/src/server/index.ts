import * as Framework from '@roots/bud-framework'
import {fs} from '@roots/bud-support'
import Express from 'express'

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
   * @internal @readonly
   */
  public readonly _assets = ['@roots/bud-server/client.js']

  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.application}
   *
   * @public
   */
  public application: Framework.Server.Application

  public get config(): Framework.Server.Configuration {
    return this.app.store.get('server')
  }

  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface."instance"}
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
   * Service register callback
   *
   * @internal
   */
  public async bootstrap(): Promise<void> {
    this.application = Express()
  }

  /**
   * Register service event
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    this.app.hooks.on('event.compiler.done', async () => {
      await fs.writeJson(this.app.path('dist', 'hmr.json'), {
        host: this.app.store.get('server.host'),
        port: this.app.store.get('server.port'),
      })
    })

    this.app.hooks.on('event.app.close', () => {
      const exists = fs.pathExistsSync(
        this.app.path('dist', 'hmr.json'),
      )

      if (exists)
        fs.removeSync(this.app.path('dist', 'hmr.json'))
    })
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
    await this.app.hooks.promised(
      'event.server.run.before',
      this.app,
    )

    await this.app.compiler.compile()
    /**
     * __roots route
     */
    this.application
      .route('/__roots/config.json')
      .get((_req, res) => {
        this.log('success', {
          message: 'GET',
          suffix: '/__roots/config.json',
        })
        res.send({
          ...this.app.store.all(),
        })

        res.end()
      })

    this.processMiddlewares()

    /**
     * Listen
     */
    this.instance = this.application.listen(
      this.app.store.get('server.port'),
      async (error: string) => {
        if (error) this.log('error', error)

        this.app.hooks.filter('event.server.listen')

        this.log(
          'success',
          'listening on port %s',
          (this.instance.address() as any).port,
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
     * If Watcher is watching and a file it is watching
     * is touched, reload the window.
     */
    this.watcher?.on &&
      this.watcher.on('change', path => {
        this.middleware?.hot?.publish({
          action: 'reload',
          message: `Detected file change: ${path}. Reloading window.`,
        })
      })

    await this.app.hooks.promised(
      'event.server.run.after',
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
  public inject(): void {
    injectClient(this.app, this.assets)
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
