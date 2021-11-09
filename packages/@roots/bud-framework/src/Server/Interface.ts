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
   * Assets
   *
   * @public
   */
  assets: string[]

  /**
   * Has files to watch and watch is enabled
   *
   * @public
   */
  isWatchable: boolean

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
  getWatchedFilesArray(): string[]

  /**
   * Run the server instance
   *
   * @public
   */
  run(): this

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
