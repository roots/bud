import type {Service} from '../../../service.js'
import type {Connection} from './connection.js'
import type * as Middleware from './middleware.js'
import type {Watcher} from './watcher.js'

export {Connection}
export {Middleware}
export {Watcher}

/**
 * Application interface
 *
 * @defaultValue express
 */
export interface Application extends Express.Application {}

/**
 * Application server connections
 */
export interface Connections extends Record<string, Connection> {
  http: Connection
  https: Connection
}

/**
 * Server interface
 */
export interface Server extends Service {
  /**
   * Server application
   *
   * @public
   */
  application: Application & {set: any; use: any}

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

   /**
   * Development server URL
   */
  url: URL

  /**
   * External development server URL
   */
  externalUrl: URL

  setConnection: any
  injectScripts: any
  applyMiddleware: any
}
