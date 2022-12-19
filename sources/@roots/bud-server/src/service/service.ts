import type {Bud} from '@roots/bud-framework/bud'
import {Service} from '@roots/bud-framework/service'
import type {
  Connection,
  Middleware,
  Service as BaseService,
} from '@roots/bud-framework/services/server'
import {bind} from '@roots/bud-support/decorators'

import * as clientScripts from '../hooks/dev.client.scripts.js'
import * as inject from '../inject.js'
import * as middlewareMap from '../middleware/middleware.js'
import {Http} from '../server/server.http.js'
import {Https} from '../server/server.https.js'
import {Watcher} from '../server/server.watcher.js'

/**
 * Server service class
 *
 * @public
 */
export class Server extends Service implements BaseService {
  /**
   * Express instance
   *
   * @public
   */
  public application: Express.Application & {set: any; use: any}

  /**
   * Watcher instance
   *
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
  public get enabledMiddleware(): BaseService['enabledMiddleware'] {
    return this.app.hooks.filter(`dev.middleware.enabled`, [])?.reduce(
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
    Record<keyof Middleware.Available, any>
  > = {}

  /**
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  public override async register?(bud: Bud) {
    if (!bud.isDevelopment) return

    this.application = await bud.module
      .import(`express`)
      .then(express => express())
    this.application.set(`x-powered-by`, false)

    this.watcher = new Watcher(() => bud)

    bud.hooks.on(`dev.client.scripts`, clientScripts.callback)

    bud.hooks.action(
      `server.before`,
      this.setConnection.bind(this),
      this.injectScripts.bind(this),
      bud.compiler.compile.bind(bud.compiler),
      this.applyMiddleware.bind(this),
      this.watcher.watch.bind(this.watcher),
    )
  }

  /**
   * Set connection
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  public async setConnection() {
    const isHttps = this.app.hooks.filter(`dev.url`).protocol === `https:`
    this.connection = isHttps ? new Https(this.app) : new Http(this.app)
  }

  /**
   * Inject scripts
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  public async injectScripts() {
    this.app.log(`injecting client scripts`)

    const injectOn = async (instance: Bud) =>
      inject.on(
        instance,
        Array.from(
          this.app.hooks.filter(`dev.client.scripts`, new Set([])),
        ),
      )

    this.app.hasChildren
      ? Object.values(this.app.children).map(injectOn)
      : injectOn(this.app)
  }

  /**
   * Apply middleware
   *
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  public async applyMiddleware() {
    Object.entries(this.enabledMiddleware).map(([key, middleware]) => {
      this.appliedMiddleware[key] = middleware(this.app)
      this.application.use(this.appliedMiddleware[key])
    })
  }

  /**
   * Run development server
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async run() {
    await this.app.hooks.fire(`server.before`)

    if (!this.app.context.args.dry) {
      await this.connection.createServer(this.application)
      await this.connection.listen()
    }

    await this.app.hooks.fire(`server.after`)
  }
}
