import * as Framework from '@roots/bud-framework'
import Express from 'express'
import {URL} from 'url'

import {inject} from '../client/inject'
import {middlewareMap} from '../middleware'
import __BudRouter from '../router/__bud'
import {bind} from './server.dependencies'
import {Watcher} from './server.watcher'

/**
 * Server service class
 *
 * @public
 */
export class Server
  extends Framework.Service
  implements Framework.Server.Server
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
  public get config(): Framework.Server.DevConfiguration {
    return {
      url: this.app.hooks.filter('dev.url'),
      watch: {
        files: this.app.hooks.filter('dev.watch.files'),
        options: this.app.hooks.filter('dev.watch.options'),
      },
      client: {
        scripts: this.app.hooks.filter('dev.client.scripts'),
      },
    }
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
  public middleware: Framework.Server.MiddlewareMap = {}

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
    const url = this.app.hooks.filter('dev.url')
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
      .on('dev.url', () => new URL('http://localhost:3000'))
      .hooks.on('dev.watch.files', () => [])
      .hooks.on('dev.watch.options', () => ({}))
      .hooks.on('dev.client.scripts', () => [
        instance =>
          `@roots/bud-server/client/index.js?name=${instance.name}&path=/__bud/hmr`,
        () => `@roots/bud-server/client/proxy-click-interceptor.js`,
      ])
  }

  /**
   * Apply middlewares
   *
   * @returns
   */
  public applyMiddlewares() {
    this.app.hooks.filter('middleware.enabled').map(key => {
      this.log(`info`, `using middleware: ${key}`)
      Object.assign(this.middleware, {
        [key]: middlewareMap[key](this.app),
      })
      this.application.use(this.middleware[key])
    })
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
      // @ts-ignore
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
          await inject(
            instance,
            this.app.hooks.filter('dev.client.scripts'),
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
