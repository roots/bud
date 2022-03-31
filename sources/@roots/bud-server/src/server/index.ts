import * as Framework from '@roots/bud-framework'
import * as BudServer from '@roots/bud-framework/server'
import {Connection} from '@roots/bud-framework/src/Server/Connection'
import {bind, once} from '@roots/bud-support'
import Express from 'express'

import {inject} from '../client/inject'
import * as middlewareMap from '../middleware'
import {seed} from '../seed'
import {Http} from './server.http'
import {Https} from './server.https'
import {Watcher} from './server.watcher'

/**
 * Server service class
 * @public
 */
export class Server
  extends Framework.Service
  implements BudServer.Service
{
  /**
   * Express instance
   * @public
   */
  public application: Express.Application

  /**
   * Express instance
   * @public
   */
  public express = Express

  /**
   * Watcher instance
   * @public
   */
  public watcher: Watcher

  /**
   * Server connections
   * @public
   */
  public connection: Connection

  /**
   * Available middleware
   * @public
   */
  public availableMiddleware = middlewareMap

  /**
   * Utilized middleware
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
   * @public
   */
  public appliedMiddleware: Partial<
    Record<keyof BudServer.Middleware.Available, any>
  > = {}

  /**
   * Register service
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  @once
  public async register(): Promise<void> {
    seed(this.app)

    this.application = this.express()
    this.application.set('x-powered-by', false)

    this.watcher = new Watcher(this.app)
  }

  /**
   * Boot service
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  @once
  public async boot(): Promise<void> {
    this.app.hooks.action(
      'event.server.before',
      this.setConnection,
      this.injectScripts,
      this.app.compiler.compile,
      this.applyMiddleware,
    )

    this.app.hooks.action('event.server.after', this.watcher.watch)
  }

  /**
   * Set connection
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  @once
  public async setConnection() {
    this.connection = this.app.hooks.filter('dev.ssl')
      ? new Https(this.app)
      : new Http(this.app)

    await this.connection.setup()
  }

  /**
   * Inject scripts
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  @once
  public async injectScripts() {
    await Promise.all(
      [this.app, ...this.app.children.getValues()].map(async instance => {
        await inject(
          instance,
          Array.from(
            instance.hooks.filter('dev.client.scripts') ?? new Set([]),
          ),
        )
      }),
    )
  }

  /**
   * Apply middleware
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

  /**
   * Run development server
   * @public
   * @decorator `@bind`
   */
  @bind
  public async run() {
    await this.app.hooks.fire('event.server.before')

    await this.connection.createServer(this.application)
    await this.connection.listen()

    await this.app.hooks.fire('event.server.after')
  }
}
