import * as Framework from '@roots/bud-framework'

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
   * {@inheritDoc @roots/bud-framework#Server.Interface.middleware}
   *
   * @public
   */
  public middleware: Framework.Server.Middleware = {}

  /**
   * Utilized middleware
   *
   * @public
   */
  public middlewareStack: Framework.Server.Middleware =
    middleware

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

    const globResults = await globby.globby(
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
    this.middleware = Object.entries(this.middlewareStack)
      .filter(([k, v]) => {
        if (this.app.store.is(`server.middleware.${k}`, true)) {
          this.log('info', `middleware ${k} is enabled.`)
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
    await this.app.compiler.compile()

    /**
     * __roots route
     */
    this.application
      .route('/__roots/config.json')
      .get((_req, res) => {
        res.send({
          ...this.app.store.all(),
          config: this.app.build.config,
        })

        res.end()
      })

    this.processMiddlewares()

    /**
     * Listen
     */
    this.instance = this.application.listen(
      this.app.store.get('server.port'),
      (error: string) => {
        if (error) this.log('error', error)

        this.log(
          'info',
          'Listening at %s',
          this.instance.address(),
        )
      },
    )

    /**
     * Initialize Watcher
     */
    const watchFiles = await this.getWatchedFiles()
    if (watchFiles.length) {
      this.watcher = chokidar.watch(watchFiles)
    }

    /**
     * If Watcher is watching and a file it is watching
     * is touched, reload the window.
     */
    this.watcher?.on &&
      this.watcher.on('change', path => {
        this.middlewareStack.hot.publish({
          action: 'reload',
          message: `Detected file change: ${path}. Reloading window.`,
        })
      })

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
