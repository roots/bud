import * as Framework from '@roots/bud-framework'
import Express from 'express'
import {URL} from 'url'

import * as middleware from '../middleware'
import __BudRouter from '../router/__bud'
import {inject} from '../util/inject'
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
   * Watcher instance
   *
   * @public
   */
  public watcher: Watcher

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
   * Process middlewares
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
    await this.app.hooks.filterAsync<'event.server.before'>(
      'event.server.before',
      this.app,
    )

    await Promise.all(
      [this.app, ...this.app.children.getValues()].map(
        async (instance: Framework.Framework) => {
          await inject(
            instance,
            (instance: Framework.Framework) =>
              `@roots/bud-server/client/index.js?name=${instance.name}&path=/__bud/hmr`,
          )
        },
      ),
    )

    this.app.hooks.on('config.override', config => {
      return config.map(compilerConfiguration => {
        compilerConfiguration.bail = false
        return compilerConfiguration
      })
    })

    await this.app.compiler.compile()
    this.processMiddlewares()

    this.application.use((req, res, next) => {
      res.status(404).send("Sorry can't find that!")
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
  public close(): void {}
}
