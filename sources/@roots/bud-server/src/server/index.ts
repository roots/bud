import * as Framework from '@roots/bud-framework'
import * as BudServer from '@roots/bud-framework/server'
import {bind, once} from '@roots/bud-support'
import Express from 'express'

import {inject} from '../client/inject'
import {logger} from '../logger'
import * as middlewareMap from '../middleware'
import {seed} from '../seed'
import {Http} from './server.http'
import {Https} from './server.https'
import {Watcher} from './server.watcher'

/**
 * Server service class
 *
 * @public
 */
export class Server
  extends Framework.Service
  implements BudServer.Service
{
  /**
   * Express instance
   *
   * @public
   */
  public application: Express.Application

  /**
   * Logger
   */
  public serverLogger = logger

  /**
   * Watcher instance
   *
   * @public
   */
  public watcher: Watcher

  /**
   * Server connections
   *
   * @public
   */
  public connection: BudServer.Service['connection'] = {
    http: null,
    https: null,
  }

  /**
   * Available middleware
   *
   * @public
   */
  public availableMiddleware = middlewareMap

  /**
   * Utilized middleware
   *
   * @public
   */
  public get enabledMiddleware(): BudServer.Service['enabledMiddleware'] {
    return this.app.hooks.filter('middleware.enabled').reduce(
      (enabled, key) => ({
        ...enabled,
        [key]: this.availableMiddleware[key],
      }),
      {},
    )
  }

  /**
   * Applied middleware
   *
   * @public
   */
  public appliedMiddleware: Partial<
    Record<keyof BudServer.Middleware.Available, any>
  > = {}

  /**
   * Register service
   *
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  @once
  public async register(): Promise<void> {
    seed(this.app)

    this.application = Express()
    this.application.set('x-powered-by', false)
    this.watcher = new Watcher(this.app)
  }

  /**
   * Boot service
   *
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  @once
  public async boot(): Promise<void> {
    this.app.hooks.action(
      'event.server.before',
      this.injectScripts,
      this.app.compiler.compile,
      this.applyMiddleware,
    )
    this.app.hooks.action('event.server.after', async () =>
      this.watcher.watch(),
    )
  }

  /**
   * Run development server
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async run() {
    await this.app.hooks.fire('event.server.before')

    if (
      this.app.hooks.filter('dev.ssl.cert') &&
      this.app.hooks.filter('dev.ssl.key')
    ) {
      this.connection.https = new Https(
        this.app,
        this.app.hooks.filter('dev.url'),
      )
      await this.connection.https.createServer(this.application)
      await this.connection.https.listen()
    } else {
      this.connection.http = new Http(
        this.app,
        this.app.hooks.filter('dev.url'),
      )
      await this.connection.http.createServer(this.application)
      await this.connection.http.listen()
    }

    await this.app.hooks.fire('event.server.after')
  }

  /**
   * Inject scripts
   *
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  @once
  public async injectScripts() {
    await Promise.all(
      [this.app, ...this.app.children.getValues()].map(
        async (instance: Framework.Framework) => {
          const scripts = Array.from(
            instance.hooks.filter('dev.client.scripts') ?? new Set([]),
          )
          await inject(instance, scripts)
        },
      ),
    )
  }

  /**
   * Apply middleware
   *
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  @once
  public async applyMiddleware() {
    Object.entries(this.enabledMiddleware).map(([key, middleware]) => {
      this.appliedMiddleware[key] = middleware(this.app)
      this.application.use(this.appliedMiddleware[key])
    })
  }
}
