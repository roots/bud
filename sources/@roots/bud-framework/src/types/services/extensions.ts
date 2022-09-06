import type {
  ApplyPlugin,
  Constructor,
  Extension,
  ExtensionLiteral,
} from '../../extension/index.js'
import type {Service as BaseService} from '../../service.js'
import type {Modules, Registry} from '../registry/modules'

export type LifecycleMethods =
  | 'init'
  | 'register'
  | 'boot'
  | 'configAfter'
  | 'buildBefore'
  | 'buildAfter'
  | 'make'

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
  repository: Registry

  methodNames: Array<LifecycleMethods>

  has<K extends keyof Modules & string>(
    key: K & string,
    ...iterable: any[]
  ): boolean

  get<K extends keyof Modules & string>(
    key: K & string,
  ): Modules[K & string]

  remove<K extends keyof Modules>(key: K & string): this

  set<K extends keyof Modules>(value: Modules[K & string]): this

  /**
   * Add an extension
   *
   * @public
   */
  add(
    input:
      | Constructor
      | ExtensionLiteral
      | Array<Constructor | ExtensionLiteral>,
  ): Promise<void>

  import(input: Record<string, any> | string): Promise<Extension>

  runAll(methodName: LifecycleMethods): Promise<Array<void>>

  run<K extends keyof Modules & string>(
    extension: Modules[K],
    methodName: LifecycleMethods,
  ): Promise<this>

  runDependencies<K extends keyof Modules & string>(
    extension: Modules[K],
    methodName: LifecycleMethods,
  ): Promise<void>

  /**
   * Returns array of {@link PluginInstance}s
   *
   * @public
   */
  make(): Promise<Array<ApplyPlugin>>
}
