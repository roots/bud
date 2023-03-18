import type Container from '@roots/container'

import type {Bud} from '../../../bud.js'
import type {
  ApplyPlugin,
  Extension,
  ExtensionLiteral,
} from '../../../extension/index.js'
import type {Service as BaseService} from '../../../service.js'
import type {Modules} from '../../registry/modules.js'

export type LifecycleMethods =
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
 */
export interface Service extends BaseService {
  unresolvable: Set<string>

  options: Container<{
    discover: boolean
    allowlist: Array<string>
    denylist: Array<string>
  }>

  repository: Modules

  make(bud: Bud): Promise<Array<ApplyPlugin>>

  isAllowed(key: string): boolean

  instantiate<K extends `${keyof Modules & string}`>(
    extension: (new (...args: any[]) => Modules[K]) | Extension,
    options?: Record<string, any>,
  ): Promise<Extension>

  has(key: string): key is keyof Modules

  get<K extends keyof Modules & string>(key: K): Modules[K]

  remove<K extends keyof Modules & string>(key: K): this

  set(value: Extension): this

  /**
   * Add an extension
   */
  add(
    extension:
      | ExtensionLiteral
      | Extension
      | (new (bud: Bud) => ExtensionLiteral)
      | `${keyof Modules & string}`
      | Array<
          | ExtensionLiteral
          | Extension
          | (new (bud: Bud) => ExtensionLiteral)
          | `${keyof Modules & string}`
        >,
  ): Promise<void>

  import<K extends `${keyof Modules}`>(
    signifier: K,
    fatalOnError?: boolean,
  ): Promise<Extension>

  runAll(methodName: LifecycleMethods): Promise<Array<void>>

  run<K extends `${keyof Modules & string}`>(
    extension: Extension | K,
    methodName: LifecycleMethods,
  ): Promise<this>

  /**
   * Run a lifecycle method on all dependencies of a given extension or
   * extension signifier.
   */
  runDependencies<K extends `${keyof Modules & string}`>(
    extension: Extension | K,
    methodName: LifecycleMethods,
  ): Promise<void>

  /**
   * Returns array of {@link PluginInstance} instances.
   */
  make(): Promise<Array<ApplyPlugin>>
}
