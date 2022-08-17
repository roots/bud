import type {Bud, Server as Base} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework/service'
import type {Connection} from '@roots/bud-framework/services/server'
import Express from 'express'
import {bind, once} from 'helpful-decorators'

import {inject} from '../inject.js'
import * as middlewareMap from '../middleware/middleware.js'
import {seed} from '../seed.js'
import {Http} from '../server/server.http.js'
import {Https} from '../server/server.https.js'
import {Watcher} from '../server/server.watcher.js'

/**
 * Server service class
 * @public
 */
export class Server extends Service implements Base.Service {
  /**
   * Express instance
   * @public
   */
  public application: Express.Application

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
  public get enabledMiddleware(): Base.Service['enabledMiddleware'] {
    return this.app.hooks.filter(`dev.middleware.enabled`).reduce(
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
    Record<keyof Base.Middleware.Available, any>
  > = {}

  /**
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  @once
  public async register() {
    if (!this.app.isDevelopment) return

    this.application = Express()
    this.application.set(`x-powered-by`, false)
    this.watcher = new Watcher(this.app)

    seed(this.app)
  }

  /**
   * `boot` callback
   *
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  @once
  public async boot() {
    this.app.hooks
      .action(
        `server.before`,
        this.setConnection,
        this.injectScripts,
        this.app.compiler.compile,
        this.applyMiddleware,
      )
      .hooks.action(`server.after`, this.watcher.watch)
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
    const isHttps = this.app.hooks.filter(`dev.url`).protocol === `https:`

    this.connection = isHttps ? new Https(this.app) : new Http(this.app)

    this.app.log(`server instantiated`)

    await this.connection.setup()

    this.app.log(`server initialized`)
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
    this.app.log(`injecting client scripts`)

    const injectOn = (instance: Bud): unknown =>
      inject(
        instance,
        Array.from(
          this.app.hooks.filter(`dev.client.scripts`) ?? new Set([]),
        ),
      )

    this.app.hasChildren
      ? Object.values(this.app.children).map(injectOn)
      : injectOn(this.app)
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
    await this.app.hooks.fire(`server.before`)

    await this.connection.createServer(this.application)
    await this.connection.listen()

    await this.app.hooks.fire(`server.after`)
  }
}
