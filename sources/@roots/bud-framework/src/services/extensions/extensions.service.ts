import {Bud} from '../..'
import {ContainerService} from '../../service'
import {Module, Plugin} from './extension'

/**
 * Container service for {@link Bud} extensions.
 *
 * @remarks
 * Extensions can be defined as a {@link Module}, which is more generic.
 *
 * They can also be defined as a {@link WebpackPlugin} which is a {@link Module}
 * specifically yielding a {@link WebpackPluginInstance}.
 *
 * When adding a {@link Module} or {@link Plugin} to the container
 * with {@link Extensions.add} it is cast to the {@link Extension} type.
 *
 * @public
 */
export interface Service extends ContainerService {
  /**
   * Extensions to be processed before build
   *
   * @public
   */
  queue: Array<Module>

  /**
   * Add an extension
   *
   * @public
   */
  add(
    extension: Module | Plugin | Array<Module> | Array<Plugin>,
  ): Promise<unknown>

  /**
   * Add an extension to the queue
   *
   * @public
   */
  enqueue(extension: Module): Bud

  /**
   * Install and register discovered extensions
   *
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
