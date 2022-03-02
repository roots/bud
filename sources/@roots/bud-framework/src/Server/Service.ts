import * as Framework from '../'
import * as Connection from './Connection'
import * as Middleware from './Middleware'
import {Watcher} from './Watcher'

export {Connection}
export {Middleware}
export {Watcher}

/**
 * Application interface
 *
 * @defaultValue express
 *
 * @public
 */
export interface Application extends Express.Application {}

/**
 * Application server connections
 *
 * @public
 */
export interface Connections
  extends Record<string, Connection.Connection> {
  http: Connection.Http
  https: Connection.Https
}

/**
 * Server interface
 *
 * @public
 */
export interface Service extends Framework.Service {
  /**
   * Server application
   *
   * @public
   */
  application: Application

  /**
   * Express instance
   *
   * @public
   */
  connection: Connections

  /**
   * Available middleware
   *
   * @public
   */
  availableMiddleware: Record<keyof Middleware.Available, any>

  /**
   * Instantiated middleware
   *
   * @public
   */
  get enabledMiddleware(): Partial<Record<keyof Middleware.Available, any>>

  /**
   * Apply middleware
   *
   * @public
   */
  apply: () => Promise<void>

  /**
   * Watcher instance
   *
   * @public
   */
  watcher: Watcher

  /**
   * Run server
   *
   * @public
   */
  run: () => Promise<void>
}
