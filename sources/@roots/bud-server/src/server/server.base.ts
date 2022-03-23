import {Framework, Server} from '@roots/bud-framework'
import {Connection} from '@roots/bud-framework/src/Server/Connection'
import {bind, fs, getPort, Signale} from '@roots/bud-support'
import {IncomingMessage} from 'http'
import {ServerResponse} from 'webpack-dev-middleware'

const {readFile} = fs

/**
 * HTTP Server
 * @public
 */
export abstract class BaseServer<T> implements Connection {
  public abstract createServer: Connection['createServer']

  /**
   * Server instance
   * @public
   */
  public instance: T & Connection['instance']

  /**
   * Port number
   * @public
   */
  public port: number

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
    this.logger = this.app.logger.instance
  }

  /**
   * util: is path like
   * @param subject - something or other
   * @returns boolean if string and starts with '/'
   */
  private isPathIsh(subject: unknown): boolean {
    return typeof subject === 'string' && subject.startsWith('/')
  }

  /**
   * Has SSL key
   * @public
   */
  @bind
  public hasKey(): boolean {
    return this.options.key ? true : false
  }

  /**
   * Has SSL certificate
   * @public
   */
  @bind
  public hasCert(): boolean {
    return this.options.cert ? true : false
  }

  /**
   * Get SSL key
   * @returns
   */
  @bind
  public async getKey(): Promise<Server.Connection.Options['key']> {
    !this.hasKey() && this.app.error('Server key is not defined')

    return this.isPathIsh(this.options.key)
      ? await readFile(this.options.key as string, 'utf8')
      : this.options.key
  }

  /**
   * Get SSL certificate
   * @public
   * @decorator `@bind`
   */
  @bind
  public async getCert(): Promise<Server.Connection.Options['cert']> {
    !this.hasCert() && this.app.error('Server cert is not defined')

    return this.isPathIsh(this.options.cert)
      ? await readFile(this.options.cert as string, 'utf8')
      : this.options.cert
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

    this.logger.log(this.url.toString())
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
    return error
  }
}
