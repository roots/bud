import type {
  ApplyPlugin,
  Constructor,
  Extension,
  ExtensionLiteral,
} from '../../extension/index.js'
import type {Modules} from '../../index.js'
import type {Service as BaseService} from '../../service.js'

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
  repository: Modules

  has<K extends keyof Modules>(
    key: K & string,
    ...iterable: any[]
  ): boolean

  get<K extends keyof Modules>(key: K & string): Modules[K & string]

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

  /**
   * Install and register discovered extensions
   *
   * @public
   */
  injectExtensions(): unknown

  runAll(
    methodName:
      | '_init'
      | '_register'
      | '_boot'
      | '_afterConfig'
      | '_beforeBuild'
      | '_make',
  ): Promise<Array<void>>

  run<K extends Modules>(
    extension: Modules[K & string],
    methodName:
      | '_init'
      | '_register'
      | '_boot'
      | '_afterConfig'
      | '_beforeBuild'
      | '_make',
  ): Promise<this>

  runDependencies<K extends Modules>(
    extension: Modules[K & string],
    methodName:
      | '_init'
      | '_register'
      | '_boot'
      | '_afterConfig'
      | '_beforeBuild'
      | '_make',
  ): Promise<void>

  /**
   * Returns array of {@link PluginInstance}s
   *
   * @public
   */
  make(): Promise<Array<ApplyPlugin>>
}
