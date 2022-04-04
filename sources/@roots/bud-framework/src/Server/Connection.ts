import {
  Server as HttpServer,
  ServerOptions as HttpServerOptions,
} from 'http'
import {
  Server as HttpsServer,
  ServerOptions as HttpsServerOptions,
} from 'https'
import {IncomingMessage, ServerResponse} from 'webpack-dev-middleware'

export {HttpsServerOptions}
export {HttpServerOptions}

export interface Options extends HttpsServerOptions, HttpServerOptions {}
export type OptionsMap = {
  [K in keyof Options as `dev.options.${K & string}`]: Options[K]
}

/**
 * Connection
 */
export interface Connection {
  /**
   * Node server
   * @public
   */
  instance: HttpServer | HttpsServer

  /**
   * Resolved port
   * @public
   */
  port: number

  /**
   * Resolved URL
   * @public
   */
  url: URL

  /**
   * User specifications
   * @public
   */
  specification: {
    port: Array<number>
    exclude: Array<number>
    host: string
  }

  /**
   * Create server
   * @public
   */
  createServer(app: any): Promise<Connection['instance']>

  /**
   * Setup
   * @public
   */
  setup(): Promise<void>

  /**
   * Listen
   *
   * @remarks
   * Node Server listen event
   *
   * @public
   */
  listen(): Promise<void>

  /**
   * On listen
   *
   * @remarks
   * Request handler
   *
   * @public
   */
  onListening(): void

  /**
   * On request
   *
   * @remarks
   * Request handler
   *
   * @public
   */
  onRequest(
    req: IncomingMessage,
    res: ServerResponse,
  ): Promise<ServerResponse>

  /**
   * On error
   *
   * @remarks
   * Error handler
   *
   * @public
   */
  onError(error: Error): void
}
