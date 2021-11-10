import {Service} from '..'
import {Configuration} from '../Configuration'
import {Application, Instance, Middleware} from '.'

/**
 * Server service interface
 *
 * @core @public @container
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
  config: Configuration['server']

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
   * Server middleware stack
   */
  middlewareStack: Middleware

  /**
   * Assets
   *
   * @public
   */
  assets: string[]

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
   * Inject client scripts into compilation
   *
   * @public
   */
  inject(): void

  /**
   * Close the server connection
   *
   * @public
   */
  close(): any
}
