import {Extension, ModuleDefinitions} from '../..'
import {Controllers, Modules} from '../../registry'
import {Service as BaseService} from '../../service'
import {Controller} from './controller'

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
export interface Service extends BaseService {
  repository: Controllers

  has<K extends keyof this['repository']>(key: K): boolean

  get<K extends keyof this['repository']>(
    key: K & string,
  ): Controller<Modules[K & string], ModuleDefinitions[K & string]>

  remove<K extends keyof this['repository']>(key: K): this

  set<K extends keyof this['repository']>(
    key: K & string,
    value: Controller<Modules[K & string], ModuleDefinitions[K & string]>,
  ): this

  setController<K extends keyof this['repository']>(
    controller: Controller<
      Modules[K & string],
      ModuleDefinitions[K & string]
    >,
  ): this

  /**
   * Add an extension
   *
   * @public
   */
  add(
    extension:
      | Extension.Constructor
      | Partial<Extension>
      | Array<Extension.Constructor | Partial<Extension>>,
  ): Promise<unknown>

  /**
   * Install and register discovered extensions
   *
   * @public
   */
  injectExtensions(): unknown

  /**
   * @public
   */
  withController<K extends keyof this['repository']>(
    controller: K & string,
    methodName: 'init' | 'register' | 'boot' | 'make',
  ): unknown

  /**
   * @public
   */
  withAllControllers(
    methodName: 'make' | 'register' | 'boot' | 'init',
  ): unknown

  /**
   * Returns array of {@link PluginInstance}s
   *
   * @public
   */
  make(): Promise<Array<Extension.PluginInstance>>
}
