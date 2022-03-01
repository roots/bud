import * as Framework from '@roots/bud-framework'
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
  implements Framework.Server.Service
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
  public conn: Framework.Server.Service['conn'] = {
    http: null,
    https: null,
  }

  /**
   * Available middleware
   *
   * @public
   */
  public availableMiddleware: Framework.Server.Service['availableMiddleware'] =
    middlewareMap

  /**
   * Utilized middleware
   *
   * @public
   */
  public enabledMiddleware: Framework.Server.Service['enabledMiddleware'] =
    {}

  /**
   * Watcher instance
   *
   * @public
   */
  public watcher: Watcher

  /**
   * Service boot callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async boot(): Promise<void> {
    seed(this.app)

    /* Instantiate express */
    this.application = Express()
    this.application.set('x-powered-by', false)

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
    this.app.hooks.filter('middleware.enabled').map(key => {
      this.log(`info`, `using middleware: ${key}`)

      const middlewareFactory = this.availableMiddleware[key]

      Object.assign(this.enabledMiddleware, {
        [key]: middlewareFactory(this.app),
      })
    })

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
            instance.hooks.filter('dev.client.scripts'),
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
    this.conn.http = new Http(this.app)
    await this.conn.http.createServer(this.application)
    await this.conn.http.listen()

    this.conn.https = new Https(this.app)
    if (!this.conn.https.isEnabled()) return
    await this.conn.https.createServer(this.application)
    await this.conn.https.listen()
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
