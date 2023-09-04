import type {Bud} from '@roots/bud-framework'
import type {
  Connection,
  Options,
} from '@roots/bud-framework/services/server'

import type {
  Server as HttpServer,
  IncomingMessage,
  ServerResponse,
} from 'node:http'
import type {Server as HttpsServer} from 'node:https'

import {bind} from '@roots/bud-support/decorators/bind'
import {BudError, ServerError} from '@roots/bud-support/errors'
import logger from '@roots/bud-support/logger'

/**
 * Node server
 *
 * @remarks
 * Base class. Extended by either `http` or `https` class.
 */
export abstract class BaseServer implements Connection {
  /**
   * Server instance
   */
  public instance: Connection['instance']

  /**
   * Constructor
   *
   * @param app - Bud
   */
  public constructor(public app: Bud) {}

  /**
   * Server error event
   */
  @bind
  public onError(error: Error) {
    const cause = BudError.normalize(error)
    throw new ServerError(cause.message, {cause})
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
   * Listen
   */
  @bind
  public async listen() {
    if (!this.app.server) {
      throw new Error(`No server instance found.`)
    }

    this.instance
      .listen(
        this.app.hooks.filter(`dev.listenOptions`, {
          host: this.app.server?.url.hostname,
          port: parseInt(this.app.server?.url.port),
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
   * Logger
   */
  public get logger(): any {
    return logger.scope(`server`, this.constructor.name.toLowerCase())
  }

  /**
   * Options
   */
  public get options(): Options {
    return this.app.hooks.filter(`dev.options`, {})
  }

  /**
   * Create server
   *
   * @virtual
   */
  public abstract createServer(app: any): Promise<HttpServer | HttpsServer>
}
