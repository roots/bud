import type {
  IncomingMessage,
  Server as HttpServer,
  ServerResponse,
} from 'node:http'
import type {Server as HttpsServer} from 'node:https'

import type {Bud} from '@roots/bud-framework/bud'
import type {Server} from '@roots/bud-framework/services'
import type {Connection} from '@roots/bud-framework/services/server'
import {bind} from '@roots/bud-support/decorators'

/**
 * Node server
 *
 * @remarks
 * Base class. Extended by either `http` or `https` class.
 *
 * @public
 */
export abstract class BaseServer implements Connection {
  /**
   * Create server
   *
   * @virtual
   * @public
   */
  public abstract createServer(app: any): Promise<HttpServer | HttpsServer>

  /**
   * Server instance
   *
   * @public
   */
  public instance: Connection['instance']

  /**
   * Logger
   *
   * @public
   */
  public get logger(): Bud[`context`][`logger`] {
    return this.app.context.logger.scope(
      this.constructor.name.toLowerCase(),
    ) as Bud[`context`][`logger`]
  }

  /**
   * Final URL
   *
   * @remarks
   * For overrides: this is what the listen event will be passed
   *
   * @public
   */
  public get url(): URL {
    return this.app.hooks.filter(`dev.url`)
  }

  /**
   * Options
   *
   * @public
   */
  public get options(): Server.Options {
    return this.app.hooks.filter(`dev.options`, {})
  }

  /**
   * Constructor
   *
   * @param app - Bud
   * @public
   */
  public constructor(public app: Bud) {}

  /**
   * Listen
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async listen() {
    this.instance
      .listen(
        this.app.hooks.filter(`dev.listenOptions`, {
          port: Number(this.url.port),
        }),
      )
      .on(
        `listening`,
        this.app.hooks.filter(`dev.onListening`, this.onListening),
      )
      .on(
        `request`,
        this.app.hooks.filter(`dev.onRequest`, this.onRequest),
      )
      .on(`error`, this.app.hooks.filter(`dev.onError`, this.onError))
  }

  /**
   * Server listen event
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public onListening(...param: any[]) {
    this.logger.info(`listening`, ...param)
  }

  /**
   * Server request event
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async onRequest(
    request: IncomingMessage,
    response: ServerResponse,
  ) {
    this.logger.log(
      `[${response.statusCode}]`,
      request.url,
      response.statusMessage ?? ``,
    )

    return response
  }

  /**
   * Server error event
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public onError(error: Error) {
    this.app.error(error)
  }
}
