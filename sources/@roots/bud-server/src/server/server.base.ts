import {Bud, Server} from '@roots/bud-framework'
import type {Connection} from '@roots/bud-framework/types/services/server/connection'
import {bind} from 'helpful-decorators'
import {IncomingMessage, Server as HttpServer} from 'node:http'
import {Server as HttpsServer} from 'node:https'
import Signale from 'signale'
import {ServerResponse} from 'webpack-dev-middleware'

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
   * Protocol
   *
   * @virtual
   * @public
   */
  public abstract protocol: 'http:' | 'https:'

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
  public logger: Signale.Signale

  /**
   * Port
   *
   * @public
   */
  public port: number

  /**
   * Final URL
   *
   * @remarks
   * For overrides: this is what the listen event will be passed
   *
   * @public
   */
  public url: URL

  /**
   * Options
   *
   * @public
   */
  public get options(): Server.Options {
    return this.app.hooks.filter('dev.options')
  }

  /**
   * Constructor
   *
   * @param app - Bud
   * @public
   */
  public constructor(public app: Bud) {
    this.logger = this.app.logger.instance.scope(
      this.constructor.name.toLowerCase(),
    )
  }

  /**
   * Setup
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async setup() {
    this.url = this.app.hooks.filter('dev.url')
  }

  /**
   * Listen
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async listen() {
    this.instance
      .listen({
        port: Number(this.url.port),
      })
      .on('listening', this.onListening)
      .on('request', this.onRequest)
      .on('error', this.onError)
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
      response.statusMessage ?? '',
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
