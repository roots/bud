import type {
  Server as HttpServer,
  ServerOptions as HttpServerOptions,
  IncomingMessage,
  ServerResponse,
} from 'node:http'
import type {
  Server as HttpsServer,
  ServerOptions as HttpsServerOptions,
} from 'node:https'

export type {HttpsServerOptions}
export type {HttpServerOptions}

export interface Options extends HttpsServerOptions, HttpServerOptions {}

export type OptionsMap = {
  [K in keyof Options as `dev.options.${K & string}`]: Options[K]
}

/**
 * Connection
 */
export interface Connection {
  /**
   * Create server
   */
  createServer(app: any): Promise<Connection['instance']>

  /**
   * Node server
   */
  instance: HttpServer | HttpsServer

  /**
   * Listen
   *
   * @remarks
   * Node Server listen event
   */
  listen(): Promise<void>

  /**
   * On error
   *
   * @remarks
   * Error handler
   */
  onError(error: Error): void

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
}
