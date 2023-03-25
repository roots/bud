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
import {BudError, ServerError} from '@roots/bud-support/errors'

/**
 * Node server
 *
 * @remarks
 * Base class. Extended by either `http` or `https` class.
 */
export abstract class BaseServer implements Connection {
  /**
   * Create server
   *
   * @virtual
   */
  public abstract createServer(app: any): Promise<HttpServer | HttpsServer>

  /**
   * Server instance
   */
  public instance: Connection['instance']

  /**
   * Logger
   */
  public get logger(): any {
    return this.app.context.logger.scope(
      `server`,
      this.constructor.name.toLowerCase(),
    )
  }

  /**
   * Options
   */
  public get options(): Server.Options {
    return this.app.hooks.filter(`dev.options`, {})
  }

  /**
   * Constructor
   *
   * @param app - Bud
   */
  public constructor(public app: Bud) {}

  /**
   * Listen
   */
  @bind
  public async listen() {
    this.instance
      .listen(
        this.app.hooks.filter(`dev.listenOptions`, {
          host: this.app.server.url.hostname,
          port: Number(this.app.server.url.port),
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
   */
  @bind
  public onListening(...param: any[]) {
    this.logger.info(`listening`, ...param)
  }

  /**
   * Server request event
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
   */
  @bind
  public onError(error: Error) {
    const cause = BudError.normalize(error)
    throw new ServerError(cause.message, {cause})
  }
}
