import {Service} from '../../service'
import {Connection} from './connection'
import * as Middleware from './middleware'
import {Watcher} from './watcher'

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
export interface Connections extends Record<string, Connection> {
  http: Connection
  https: Connection
}

/**
 * Server interface
 *
 * @public
 */
export interface Server extends Service {
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
  connection: Connection

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
  enabledMiddleware: Partial<Record<keyof Middleware.Available, any>>

  /**
   * Instantiated middleware
   *
   * @public
   */
  appliedMiddleware: Partial<Record<keyof Middleware.Available, any>>

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
