import {Service} from '../Service'
import {Store} from '../Store'
import {Application, Instance, Middleware} from '.'

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
  instance: Instance

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
    [key: string]: any
    close: CallableFunction
    on: CallableFunction
  }

  /**
   * Retrieve an array of watched files.
   *
   * @public
   */
  getWatchedFiles(): Promise<Array<string>>

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
