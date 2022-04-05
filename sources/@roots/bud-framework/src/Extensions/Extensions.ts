import {Framework} from '../Framework'
import {Service} from '../Service'
import {CompilerPlugin, Module} from './Extension'

/**
 * Extensions Service interface
 *
 *  @public
 */
export interface Extensions extends Service {
  /**
   * Extensions to be processed before build
   *
   * @public
   */
  queue: Array<CompilerPlugin | Module>

  /**
   * Add an extension
   *
   * @public
   */
  add(extension: Module | Array<Module>): Promise<void>

  /**
   * @public
   */
  enqueue(extension: Module): Framework

  /**
   * Auto install and register discovered extensions
   * @public
   */
  injectExtensions(): Promise<void>

  /**
   * Register event for all extensions
   *
   * @public
   */
  registerExtensions(): Promise<void>

  /**
   * Boot event for all extensions
   *
   * @public
   */
  bootExtensions(): Promise<void>

  /**
   * Get {@link ApplyPlugin} instances to be included in compilation
   *
   * @public
   */
  make(): Promise<{[key: string]: any; apply: CallableFunction}[]>

  /**
   * @public
   */
  processQueue(): Promise<void>
}
