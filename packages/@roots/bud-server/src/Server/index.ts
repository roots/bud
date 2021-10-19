import {Server, Service} from '@roots/bud-framework'
import {resolve} from 'path'

import * as middleware from '../middleware'
import {injectClient} from '../util/injectClient'
import {bind, chokidar, globby} from './server.dependencies'
import type {Container, Watcher} from './server.interface'

/**
 * Server service container implementation
 *
 * @public @core @container
 */
export default class
  extends Service<Server.Configuration>
  implements Server.Interface
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
  public application: Server.Application

  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface."instance"}
   *
   * @public
   */
  public instance: Server.Instance

  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.config}
   *
   * @public
   */
  public config: Container<Server.Configuration>

  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.middleware}
   *
   * @public
   */
  public middleware: Server.Middleware = {}

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
    const [files, options] = this.config.getValues('watch')

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
      if (this.config.isTrue(`middleware.${key}`)) {
        this.app.log(`Enabling ${key}`)

        const configuredMiddleware = generate.bind(this.app)({
          config: this.config,
          compiler: this.app.compiler.instance,
        })

        this.app.log(
          `configured middleware: ${key}`,
          configuredMiddleware,
        )

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
          ...this.config.all(),
        })

        res.end()
      })

    this.processMiddlewares()

    /**
     * Listen
     */
    this.instance = this.application.listen(
      this.config.get('port'),
      () => {
        this.app.log(
          `Server listening on %s`,
          this.config.get('port'),
        )

        this.app.log({
          ...this.config.all(),
          middleware,
        })
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
