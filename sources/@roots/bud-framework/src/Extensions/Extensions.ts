import {Framework} from '../Framework'
import {Service} from '../Service'
import {CompilerPlugin, Controller, Module} from './Extension'

/**
 * Extensions Service
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
   * Add a {@link Controller} to the container
   *
   * @public
   */
  add(extension: CompilerPlugin | Module): Promise<void>

  /**
   * Queue an extension to be added to the container before the build process.
   *
   * @remarks
   * Useful for extensions which cannot be added in an awaitable context (like a user config)
   *
   * @public
   * @decorator `@bind`
   */
  enqueue(extension: CompilerPlugin | Module): Framework

  /**
   * Auto install and register discovered extensions
   * @public
   */
  injectExtensions(): Promise<void>

  /**
   * Call {@link Controller.register} on all {@link Controller}s
   *
   * @public
   */
  registerExtensions(): Promise<void>

  /**
   * Call an {@link Controller.register}
   *
   * @public
   */
  registerExtension(extension: Controller): Promise<void>

  /**
   * Boot event for all extensions
   *
   * @public
   */
  bootExtensions(): Promise<void>

  /**
   * Returns an array of plugin instances which have been registered to the
   * container and are set to be used in the compilation
   *
   * @returns An array of plugin instances
   *
   * @public
   */
  make(): Promise<{[key: string]: any; apply: CallableFunction}[]>

  /**
   * @public
   */
  processQueue(): Promise<void>
}
