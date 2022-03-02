import * as Framework from '@roots/bud-framework'
import * as BudServer from '@roots/bud-framework/server'
import {bind} from '@roots/bud-support'
import Express from 'express'

import {inject} from '../client/inject'
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
   * Server connections
   *
   * @public
   */
  public connection = {http: null, https: null}

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
   * Watcher instance
   *
   * @public
   */
  public watcher: Watcher

  /**
   * Service register callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register(): Promise<void> {
    seed(this.app)

    this.application = Express()
    this.application.set('x-powered-by', false)
  }

  /**
   * Service boot callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async boot(): Promise<void> {
    /* Watching */
    this.app.hooks
      .action('event.server.before', async app => {
        this.watcher = new Watcher(app)
      })
      .hooks.action(
        'event.server.after',
        async app => await app.server.watcher?.watch(),
      )
  }

  /**
   * Apply middlewares
   *
   * @returns
   * @decorator `@bind`
   */
  @bind
  public async apply() {
    Object.values(this.enabledMiddleware).map(middleware =>
      this.application.use(middleware),
    )
  }

  /**
   * Run server
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async run() {
    await this.app.hooks.fire('event.server.before')

    await this.compile()

    await this.apply()

    await this.initializeServers()

    await this.app.hooks.fire('event.server.after')
  }

  /**
   * Run compilation
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async compile() {
    await Promise.all(
      [this.app, ...this.app.children.getValues()].map(
        async (instance: Framework.Framework) => {
          await inject(
            instance,
            Array.from(
              instance.hooks.filter('dev.client.scripts') ?? new Set([]),
            ),
          )
        },
      ),
    )

    await this.app.compiler.compile()
  }

  /**
   * Initialize servers
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async initializeServers(): Promise<void> {
    this.connection.http = new Http(this.app)
    await this.connection.http.createServer(this.application)
    await this.connection.http.listen()

    this.connection.https = new Https(this.app)
    if (!this.connection.https.isEnabled()) return
    await this.connection.https.createServer(this.application)
    await this.connection.https.listen()
  }
}
