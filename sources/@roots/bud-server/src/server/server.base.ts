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

  public port: number

  /**
   * Options
   * @public
   */
  public get options(): Server.Connection.Options {
    return {
      ...(this.app.hooks.filter(`dev.options`) ?? {}),
    }
  }

  /**
   * Port options
   * @public
   */
  public get specification() {
    return {
      port: this.app.hooks.filter('dev.port') ?? [3000],
      exclude: this.app.hooks.filter('dev.exclude') ?? [],
      host: this.app.hooks.filter('dev.host') ?? '0.0.0.0',
    }
  }

  public get url(): URL {
    const protocol = this.app.hooks.filter('dev.ssl') ? 'https:' : 'http:'
    const url = new URL(`${protocol}//${this.specification.host}`)

    url.port = `${this.port}`
    url.pathname = '/'
    return url
  }

  /**
   * Constructor
   * @param app - Framework
   * @public
   */
  public constructor(public app: Framework) {
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
    this.port = await getPort(this.specification)

    if (!this.specification.port.includes(Number(this.port))) {
      this.logger.warn(
        `\n`,
        `None of the requested ports could be resolved.`,
        `A port was automatically selected: ${this.port}`,
      )
    }
  }

  /**
   * Listen
   * @public
   * @decorator `@bind`
   */
  @bind
  public async listen() {
    this.instance
      .listen(this.port, this.onListening)
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
