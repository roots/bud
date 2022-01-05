import {Service} from '../Service'
import {Store} from '../Store'
import {
  Application,
  HttpInstance,
  HttpsInstance,
  Middleware,
} from '.'

/**
 * Server service interface
 *
 *  @public
 */
export default interface Interface extends Service {
  /**
   * Server application
   *
   * @public
   */
  application: Application

  /**
   * Server configuration
   *
   * @remarks
   * Aliases for `store.config.repository.server`
   *
   * @public
   */
  config: Store.Repository['server']

  /**
   * Server instance
   *
   * @public
   */
  instance: {
    http: HttpInstance
    https: HttpsInstance
  }

  /**
   * Server middleware
   *
   * @public
   */
  middleware: Middleware

  /**
   * Watcher instance
   *
   * @public
   */
  watcher: {
    getWatchedFiles(): Promise<Array<string>>
    watch(): Promise<void>
  }

  /**
   * Run the server instance
   *
   * @public
   */
  run(): Promise<this>

  /**
   * Close the server connection
   *
   * @public
   */
  close(): any
}
