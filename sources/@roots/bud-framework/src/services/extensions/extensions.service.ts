import {Bud, Extension, Module, PluginInstance} from '../../extension'
import {ContainerService} from '../../service'

export type BudExtension = Module | (new (app: () => Bud) => Extension)

/**
 * Container service for {@link Bud} extensions.
 *
 * @remarks
 * Extensions can be defined as a {@link Module}, which is more generic.
 *
 * They can also be defined as a {@link Plugin} which is a {@link Module}
 * yielding a {@link PluginInstance}.
 *
 * @public
 */
export interface Service extends ContainerService {
  /**
   * Add an extension
   *
   * @public
   */
  add(extension: BudExtension | Array<BudExtension>): Promise<unknown>

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
  registerAll(): Promise<void>

  /**
   * Boot event for all extensions
   *
   * @public
   */
  bootAll(): Promise<void>

  /**
   * Returns array of {@link PluginInstance}s
   *
   * @public
   */
  make(): Promise<Array<PluginInstance>>
}
