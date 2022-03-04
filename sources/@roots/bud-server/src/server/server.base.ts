import {Framework} from '@roots/bud-framework'
import {Connection} from '@roots/bud-framework/src/Server/Connection'
import {bind, getPort, Signale} from '@roots/bud-support'
import {IncomingMessage, Server as HttpServer} from 'http'
import {Server as HttpsServer} from 'https'
import {ServerResponse} from 'webpack-dev-middleware'

/**
 * HTTP Server
 *
 * @public
 */
export abstract class BaseServer<T> implements Connection {
  public abstract createServer: Connection['createServer']

  /**
   * Server instance
   *
   * @public
   */
  public instance: T & (HttpServer | HttpsServer)

  /**
   * Port number
   *
   * @public
   */
  public port: number

  /**
   * Logger
   *
   * @public
   */
  public logger: Signale

  /**
   * Constructor
   *
   * @param app - Framework
   */
  public constructor(public app: Framework, public url: URL) {
    this.logger = this.app.logger.instance.scope(
      this.constructor.name.toLowerCase(),
    )
  }

  /**
   * setup
   *
   * @public
   */
  @bind
  public async setup() {
    const port = await getPort({port: Number(this.url.port)})
    this.url.port = `${port}`
    this.app.hooks.on('dev.url', this.url)

    this.logger.log(this.url.toString())
  }

  /**
   * Listen
   *
   * @public
   */
  @bind
  public async listen() {
    this.instance
      .listen({port: this.url.port, host: this.url.hostname})
      .on('listening', this.onListening)
      .on('request', this.onRequest)
      .on('error', this.onError)
  }

  /**
   * Server listen event
   *
   * @public
   */
  @bind
  public onListening() {
    this.logger.info(`listening`)
  }

  /**
   * Server request
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async onRequest(
    request: IncomingMessage,
    response: ServerResponse,
  ) {
    if (request.headers['bud-healthcheck']) return response

    if (response.statusCode === 200) {
      this.logger.success([response.statusCode], request.url)
      return response
    }

    if (response.statusCode === 500) {
      this.logger.error([response.statusCode], request.url)
      return response
    }

    return response
  }

  /**
   * Server error
   *
   * @param error - error
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public onError(error: Error) {
    this.app.error(error)
  }
}
