import {Server as Contract, Service} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import * as chokidar from 'chokidar'
import {FSWatcher} from 'fs-extra'
import {GlobbyOptions, sync as globbySync} from 'globby'
import {createHttpTerminator} from 'http-terminator'
import {resolve} from 'path'

import * as middleware from '../middleware'
import {injectClient} from '../util/injectClient'

/**
 * Override globby.sync return
 */
const sync = globbySync as (
  paths: string[],
  options: GlobbyOptions,
) => string[]

export class Server
  extends Service<Contract.Configuration>
  implements Contract
{
  public name = 'server'

  public application: Contract.Application

  public config: Contract.Config

  public instance: Contract.Instance

  public middleware: Contract.Middleware.Inventory = {}

  public _terminator: any

  public watcher: FSWatcher

  public readonly _assets = [
    resolve(__dirname, '../client/index.js'),
  ]

  public get assets() {
    return this._assets
  }

  public get isWatchable(): boolean {
    return (
      Array.isArray(this.getWatchedFilesArray()) &&
      this.getWatchedFilesArray().length > 0
    )
  }

  @bind
  public getWatchedFilesArray(): string[] {
    const [files, options] = this.config.getValues('watch')

    return files?.length > 0
      ? sync(
          files.map((file: string) =>
            this.app.path('project', file),
          ),
          options,
        )
      : []
  }

  @bind
  public processMiddlewares() {
    Object.entries(middleware).map(([key, generate]) => {
      if (this.config.isTrue(`middleware.${key}`)) {
        this.app.info(`Enabling ${key}`)

        this.middleware[key] = generate({
          config: this.config,
          compiler: this.app.compiler.instance,
        })
      }
    })

    Object.values(this.middleware).forEach(middleware =>
      this.application.use(middleware),
    )
  }

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
        this.app.info(
          `Server listening on %s`,
          this.config.get('port'),
        )

        this.app.info({
          ...this.config.all(),
          middleware,
        })
      },
    )

    this._terminator = createHttpTerminator({
      server: this.instance,
    })

    this.watcher = chokidar.watch(this.getWatchedFilesArray())

    this.isWatchable &&
      this.watcher?.on('change', path => {
        this.middleware.hot.publish({
          action: 'reload',
          message: `Detected file change: ${path}. Reloading window.`,
        })
      })

    return this
  }

  @bind
  public inject(): void {
    injectClient(this.app, this.assets)
  }

  @bind
  public close(): void {
    this._terminator && this._terminator.terminate()
  }
}
