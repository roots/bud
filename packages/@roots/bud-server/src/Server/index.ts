import * as Framework from '@roots/bud-framework'
import {resolve} from 'path'

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
  public readonly _assets = [
    resolve(__dirname, '../client/index.js'),
  ]

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
   * {@inheritDoc @roots/bud-framework#Server.Interface.isWatchable}
   *
   * @readonly @public
   */
  public get isWatchable(): boolean {
    return (
      Array.isArray(this.getWatchedFilesArray()) &&
      this.getWatchedFilesArray().length > 0
    )
  }

  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.getWatchedFilesArray}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getWatchedFilesArray(): string[] {
    const [files, options] =
      this.app.store.getValues('server.watch')

    return files?.length > 0
      ? (globby.globbySync(
          files.map((file: string) =>
            this.app.path('project', file),
          ),
          options,
        ) as unknown as string[])
      : []
  }

  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.processMiddlewares}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public processMiddlewares() {
    Object.entries(middleware).map(([key, generate]) => {
      if (this.app.store.isTrue(`server.middleware.${key}`)) {
        this.app.log(`Enabling middleware: ${key}`)

        const configuredMiddleware = generate(this.app)

        this.app.log(`configured middleware: ${key}`)

        this.application.use(configuredMiddleware)
      }
    })
  }

  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.run}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public run(): this {
    this.app.compiler.compile()

    /**
     * __roots route
     */
    this.application
      .route('/__roots/config.json')
      .get((_req, res) => {
        res.send({
          ...this.app.store.all(),
          ...this.app.store.get('server'),
        })

        res.end()
      })

    this.processMiddlewares()

    /**
     * Listen
     */
    this.instance = this.application.listen(
      this.app.store.get('server.port'),
      () => {
        this.app.log(
          `Server listening on %s`,
          this.app.store.get('server.port'),
        )
      },
    )

    /**
     * Initialize Watcher
     */
    this.watcher = chokidar.watch(this.getWatchedFilesArray())

    /**
     * If Watcher is watching and a file it is watching
     * is touched, reload the window.
     */
    this.isWatchable &&
      this.watcher?.on('change', path => {
        this.middleware.hot.publish({
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
