import {Service, Server as Contract} from '@roots/bud-framework'
import chokidar from 'chokidar'
import globby from 'globby'
import {FSWatcher} from 'fs-extra'
import {resolve} from 'path'
import {boundMethod as bind} from 'autobind-decorator'
import * as middleware from '../middleware'
import {injectClient} from '../util/injectClient'

/**
 * Override globby.sync return
 */
const sync = globby.sync as (
  paths: string[],
  options: globby.GlobbyOptions,
) => string[]

export class Server extends Service implements Contract {
  public name = '@roots/bud-server'

  public middleware: Contract.Middleware.Inventory = {}

  public config: Contract.Config

  public _instance: Contract.Instance

  public _watcher: FSWatcher

  public get instance() {
    return this._instance
  }

  public set instance(instance) {
    this._instance = instance
  }

  public get watcher() {
    return this._watcher
  }

  public set watcher(watcher: FSWatcher) {
    this._watcher = watcher
  }

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
      this.instance.use(middleware),
    )
  }

  @bind
  public run(): this {
    this.app.compiler.compile()

    /**
     * __roots route
     */
    this.instance
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
    this.instance.listen(this.config.get('port'), () => {
      this.app.info(
        `Server listening on %s`,
        this.config.get('port'),
      )

      this.app.info({
        ...this.config.all(),
        middleware,
      })
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
}
