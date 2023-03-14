import type {
  IncomingMessage,
  Server as HttpServer,
  ServerOptions as HttpServerOptions,
  ServerResponse,
} from 'node:http'
import type {
  Server as HttpsServer,
  ServerOptions as HttpsServerOptions,
} from 'node:https'

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
   */
  instance: HttpServer | HttpsServer

  /**
   * Create server
   */
  createServer(app: any): Promise<Connection['instance']>

  /**
   * Listen
   *
   * @remarks
   * Node Server listen event
   */
  listen(): Promise<void>

  /**
   * On listen
   *
   * @remarks
   * Request handler
   */
  onListening(): void

  /**
   * On request
   *
   * @remarks
   * Request handler
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
   */
  onError(error: Error): void
}
