import * as Framework from '@roots/bud-framework'
import Express from 'express'

import * as middleware from '../middleware'
import __BudRouter from '../router/__bud'
import {inject} from '../util/inject'
import {bind} from './server.dependencies'
import {Watcher} from './server.watcher'

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
   * Port
   *
   * @public
   */
  public get port(): string {
    const url = this.app.store.get('server.dev.url')
    if (!url.port || url.port == '') {
      return url.protocol == 'https:' ? '443' : '80'
    }

    return url.port
  }

  /**
   * Service boot callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async boot(): Promise<void> {
    this.application = Express()

    this.app.hooks
      .on('server.middleware', () => middleware)

      .hooks.on('server.inject', () => [
        instance =>
          `@roots/bud-server/client/index.js?name=${instance.name}&path=/__bud/hmr`,
      ])

      .hooks.async('event.server.before', async app => {
        app.when(
          ({store}) => store.is('server.middleware.proxy', true),
          ({hooks}) =>
            hooks.on('server.inject', inject => [
              ...inject,
              () => `@roots/bud-server/client/proxy-click-interceptor.js`,
            ]),
        )

        return app
      })
  }

  /**
   * Apply middlewares
   *
   * @returns
   */
  public applyMiddlewares() {
    Object.entries(this.app.hooks.filter('server.middleware')).map(
      ([key, factory]) => {
        this.log(`info`, `using middleware: ${key}`)

        const middleware = factory(this.app)

        Object.assign(this.middleware, {
          [key]: middleware,
        })

        this.application.use(this.middleware[key])
      },
    )
  }

  /**
   * {@inheritDoc @roots/bud-framework#Server.Interface.run}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async run(): Promise<this> {
    /**
     * Instantiate watcher
     */
    this.watcher = new Watcher(this.app)

    /**
     * Filter server before
     */
    await this.app.hooks.filterAsync<'event.server.before'>(
      'event.server.before',
      this.app,
    )

    /**
     * Prep and run compilation
     */
    await this.compile()

    this.applyMiddlewares()

    /**
     * 404 middleware
     */
    this.application.use(
      (
        _req: Express.Request,
        res: Express.Response,
        _next: Express.NextFunction,
      ) => {
        res.status(404).send("Sorry can't find that!")
      },
    )

    /**
     * Listen
     */
    this.instance = this.application.listen(
      this.port,
      async (error: string) => {
        this.log('info', `started server on %s`, this.port)
        if (error) this.log('error', error)

        this.app.hooks.filter('event.server.listen')
      },
    )

    /**
     * If watching and a watched file is touched, update hmr websocket
     * event subscribers.
     */
    await this.watcher.watch()
    this.watcher.instance.on('change', path => {
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

  @bind
  public async compile() {
    await Promise.all(
      [this.app, ...this.app.children.getValues()].map(
        async (instance: Framework.Framework) => {
          await inject(instance, this.app.hooks.filter('server.inject'))
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
  }

  /**
   * App close handler
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public close(): void {}
}
