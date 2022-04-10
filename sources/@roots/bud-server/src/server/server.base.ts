import {Bud, Server} from '@roots/bud-framework'
import {Connection} from '@roots/bud-framework/types/services/server/connection'
import {bind, Signale} from '@roots/bud-support'
import {IncomingMessage, Server as HttpServer} from 'http'
import {Server as HttpsServer} from 'https'
import {ServerResponse} from 'webpack-dev-middleware'

/**
 * Node server
 * @public
 */
export abstract class BaseServer implements Connection {
  /**
   * protocol
   * @virtual
   * @public
   */
  public abstract protocol: 'http:' | 'https:'

  /**
   * Create server
   * @virtual
   * @public
   */
  public abstract createServer(app: any): Promise<HttpServer | HttpsServer>

  /**
   * Server instance
   * @public
   */
  public instance: Connection['instance']

  /**
   * Logger
   * @public
   */
  public logger: Signale

  /**
   * Port
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
   * host
   * @public
   */
  public get hostname(): string {
    return this.app.hooks.filter('dev.hostname', '0.0.0.0')
  }

  /**
   * interface
   * @public
   */
  public get interface(): string {
    return this.app.hooks.filter('dev.interface')
  }

  /**
   * Options
   * @public
   */
  public get options(): Server.Options {
    return this.app.hooks.filter(`dev.options`)
  }

  /**
   * Constructor
   * @param app - Bud
   * @public
   */
  public constructor(public app: Bud) {
    this.logger = this.app.logger.instance.scope(
      this.constructor.name.toLowerCase(),
    )
  }

  /**
   * setup
   * @public
   * @decorator `@bind`
   */
  @bind
  public async setup() {
    this.url = new URL(`${this.protocol}//${this.hostname}`)
    this.url.port = `${this.app.hooks.filter('dev.port')}`
    this.url.pathname = '/'
  }

  /**
   * Listen
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
   * @public
   * @decorator `@bind`
   */
  @bind
  public onListening(...param: any[]) {
    this.logger.info(`listening`, ...param)
  }

  /**
   * Server request
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
   * Server error
   * @public
   * @decorator `@bind`
   */
  @bind
  public onError(error: Error) {
    this.app.error(error)
  }
}
