import {Server as HttpServer} from 'http'
import {Server as HttpsServer} from 'https'

/**
 * Connection
 */
export interface Connection<T = HttpServer> {
  /**
   * Node server
   *
   * @public
   */
  instance: T

  /**
   * Server port
   *
   * @public
   */
  get port(): string

  /**
   * Server hostname
   *
   * @public
   */
  get hostname(): string

  /**
   * Create server
   *
   * @remarks
   * Returns Node server
   *
   * @public
   */
  createServer(app: any): Promise<T>

  /**
   * Listen
   *
   * @remarks
   * Node Server listen event
   *
   * @public
   */
  listen(): Promise<void>
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
   * SSL enabled
   *
   * @public
   */
  isEnabled(): boolean

  /**
   * Has SSL key
   *
   * @public
   */
  hasKey(): boolean

  /**
   * Get SSL key
   *
   * @returns
   */
  getKey(): Promise<string>

  /**
   * Has SSL certificate
   *
   * @public
   */
  hasCert(): boolean

  /**
   * Get SSL certificate
   *
   * @public
   */
  getCert(): Promise<string>
}
