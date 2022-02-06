import {Framework} from '../Framework'
import {Service} from '../Service'
import * as Extension from './Extension'

/**
 * Extensions Service interface
 *
 *  @public
 */
export interface Extensions extends Service {
  /**
   * Extensions added to application using a syncronous facade
   *
   * @public
   */
  queue: Array<Extension.Module>

  /**
   * Add an extension to the application syncronously
   *
   * @public
   */
  enqueue(extension: Extension.Module): Framework

  /**
   * Clear the queue
   *
   * @remarks
   * Executes every stage of the extension
   * lifecycle for every extension in the queue
   *
   * @public
   */
  processQueue(): Promise<void>

  /**
   * Make controller from {@link Extension.Module}
   *
   * @remarks
   * The second optional parameter is an array of extension controllers
   * considered to be dependencies of the controller being created.
   *
   * @public
   */
  makeController(extension: Extension.Module, peers?: Array<string>): any

  /**
   * Add an extension
   *
   * @public
   */
  add(extension: Extension.Module): Promise<unknown>

  /**
   * Import an extension
   *
   * @public
   */
  import(source: Extension.BudManifest | string): Promise<Extension.Module>

  /**
   * Process {@link Module} instances to be included in compilation
   *
   * @remarks
   * In order for a module to be valid it must have an `apply` method
   * as per Webpack documentation.
   *
   * @public
   */
  make(): Promise<{[key: string]: any; apply: CallableFunction}[]>
}
