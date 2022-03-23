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
export interface Connection<T = HttpServer> {
  /**
   * Node server
   * @public
   */
  instance: T

  /**
   * Server URL
   * @public
   */
  url: URL

  /**
   * Server port
   * @public
   */
  get port(): number

  /**
   * Create server
   * @remarks
   * Returns Node server
   * @public
   */
  createServer: (app: any) => Promise<T>

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

/**
 * Server instance
 *
 * @defaultValue express instance
 *
 * @public
 */
export interface Http extends Connection<HttpServer> {}

/**
 * Https Connection
 *
 * @public
 */
export interface Https extends Connection<HttpsServer> {
  /**
   * Has SSL key
   * @public
   */
  hasKey(): boolean

  /**
   * Get SSL key
   * @returns
   */
  getKey(): Promise<Options['key']>

  /**
   * Has SSL certificate
   * @public
   */
  hasCert(): boolean

  /**
   * Get SSL certificate
   * @public
   */
  getCert(): Promise<Options['cert']>
}
