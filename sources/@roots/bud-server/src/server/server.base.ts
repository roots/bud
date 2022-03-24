import {Framework, Server} from '@roots/bud-framework'
import {Connection} from '@roots/bud-framework/src/Server/Connection'
import {bind, getPort, Signale} from '@roots/bud-support'
import {IncomingMessage, Server as HttpServer} from 'http'
import {Server as HttpsServer} from 'https'
import {ServerResponse} from 'webpack-dev-middleware'

/**
 * HTTP Server
 * @public
 */
export abstract class BaseServer implements Connection {
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
   * Options
   * @public
   */
  public get options(): Server.Connection.Options {
    return this.app.hooks.filter(`dev.options`)
  }

  /**
   * Constructor
   * @param app - Framework
   * @public
   */
  public constructor(public app: Framework, public url: URL) {
    this.logger = this.app.logger.instance.scope('dev')
  }

  /**
   * setup
   * @public
   * @decorator `@bind`
   */
  @bind
  public async setup() {
    const port = await getPort({port: Number(this.url.port)})

    this.url.port = `${port}`
    this.app.hooks.on('dev.url', this.url)

    this.logger.log('url', this.url.toString())
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
      .listen({port: this.url.port, host: this.url.hostname})
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
    const kind = response.statusCode === 200 ? 'success' : 'error'
    this.logger[kind]([response.statusCode], request.url)

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
