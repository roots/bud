import type {Connection} from './connection.js'
import type * as Middleware from './middleware.js'
import type {Watcher} from './watcher.js'

export type {Connection}
export type {Middleware}
export type {Watcher}

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
export interface Server {
  /**
   * Server application
   */
  application: Application & {set: any; use: any}

  /**
   * Instantiated middleware
   */
  appliedMiddleware: Partial<Record<keyof Middleware.Available, any>>

  /**
   * Apply middleware
   */
  applyMiddleware: any

  /**
   * Available middleware
   */
  availableMiddleware: Record<keyof Middleware.Available, any>

  /**
   * Express instance
   */
  connection: Connection

  /**
   * Instantiated middleware
   */
  enabledMiddleware: Partial<Record<keyof Middleware.Available, any>>

  /**
   * Inject client scripts
   */
  injectScripts: any

  /**
   * Proxy development server URL
   */
  proxyUrl: URL

  /**
   * Proxy development server URL
   */
  publicProxyUrl: URL

  /**
   * External development server URL
   */
  publicUrl: URL

  /**
   * Run server
   */
  run: () => Promise<void>

  /**
   * Set server connection
   */
  setConnection: (connection?: Connection) => Promise<Connection>

  /**
   * Development server URL
   */
  url: URL

  /**
   * Watcher instance
   */
  watcher: Watcher
}
