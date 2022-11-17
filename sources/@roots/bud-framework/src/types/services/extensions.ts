import type Container from '@roots/container'

import type {Bud} from '../../bud.js'
import type {
  ApplyPlugin,
  Constructor,
  Extension,
  ExtensionLiteral,
} from '../../extension/index.js'
import type {Service as BaseService} from '../../service.js'
import type {Modules} from '../registry/modules.js'

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
  unresolvable: Set<string>

  options: Container<{
    discovery: boolean
    allowlist: Array<string>
    denylist: Array<string>
  }>

  repository: Modules

  register(bud: Bud): Promise<void>

  booted(bud: Bud): Promise<void>

  configAfter(bud: Bud): Promise<void>

  buildBefore(bud: Bud): Promise<void>

  buildAfter(bud: Bud): Promise<void>

  make(bud: Bud): Promise<Array<ApplyPlugin>>

  isAllowed(key: string): boolean

  instantiate<K extends `${keyof Modules & string}`>(
    extension: (new (...args: any[]) => Modules[K]) | ExtensionLiteral,
    options?: Record<string, any>,
  ): Promise<Extension | ApplyPlugin>

  has<K extends keyof Modules & string>(key: K): boolean

  get<K extends keyof Modules & string>(key: K): Modules[K]

  remove<K extends keyof Modules & string>(key: K): this

  set<K extends keyof Modules & string>(value: Modules[K]): this

  /**
   * Add an extension
   *
   * @public
   */
  add(
    input:
      | Constructor
      | ExtensionLiteral
      | Extension
      | (keyof Modules & string)
      | Array<
          | Constructor
          | ExtensionLiteral
          | Extension
          | `${keyof Modules & string}`
        >,
    options?: Record<string, any>,
  ): Promise<void>

  import<K extends `${keyof Modules}`>(
    signifier: K,
    fatalOnError?: boolean,
  ): Promise<Extension | ApplyPlugin>

  runAll(methodName: LifecycleMethods): Promise<Array<void>>

  run<K extends `${keyof Modules & string}`>(
    extension: Extension | ApplyPlugin | K,
    methodName: LifecycleMethods,
  ): Promise<this>

  runDependencies<K extends `${keyof Modules & string}`>(
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
