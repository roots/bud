import type {Bud, Modules} from '@roots/bud-framework'
import type {
  ApplyPlugin,
  Extension,
  ExtensionLiteral,
} from '@roots/bud-framework/extension'
import type Container from '@roots/container'

export type LifecycleMethods =
  | 'boot'
  | 'buildAfter'
  | 'buildBefore'
  | 'compilerDone'
  | 'configAfter'
  | 'make'
  | 'register'

/**
 * Container service for {@link Bud} extensions.
 *
 * @remarks
 * Extensions can be defined as a {@link Module}, which is more generic.
 *
 * They can also be defined as a {@link Plugin} which is a {@link Module}
 * yielding a {@link PluginInstance}.
 */
export interface Extensions {
  /**
   * Add an extension
   */
  add(
    extension:
      | `${keyof Modules & string}`
      | Array<
          | `${keyof Modules & string}`
          | Extension
          | ExtensionLiteral
          | (new (bud: Bud) => ExtensionLiteral)
        >
      | Extension
      | ExtensionLiteral
      | (new (bud: Bud) => ExtensionLiteral),
  ): Promise<void>

  get<K extends keyof Modules & string>(key: K): Modules[K]

  has(key: string): key is keyof Modules

  import<K extends `${keyof Modules}`>(
    signifier: K,
    fatalOnError: boolean,
  ): Promise<Extension>

  instantiate<K extends `${keyof Modules & string}`>(
    extension: Extension | (new (...args: any[]) => Modules[K]),
    options?: Record<string, any>,
  ): Promise<Extension>

  isAllowed(key: string): boolean

  /**
   * Returns array of {@link PluginInstance} instances.
   */
  make(): Promise<Array<ApplyPlugin>>

  make(bud: Bud): Promise<Array<ApplyPlugin>>

  options: Container<{
    allowlist: Array<string>
    denylist: Array<string>
    discover: boolean
  }>

  remove<K extends keyof Modules & string>(key: K): this

  repository: Modules

  run<K extends `${keyof Modules & string}`>(
    extension: Extension | K,
    methodName: LifecycleMethods,
  ): Promise<this>

  runAll(methodName: LifecycleMethods): Promise<Array<void>>

  /**
   * Run a lifecycle method on all dependencies of a given extension or
   * extension signifier.
   */
  runDependencies<K extends `${keyof Modules & string}`>(
    extension: Extension | K,
    methodName: LifecycleMethods,
  ): Promise<void>

  set(value: Extension): this

  unresolvable: Set<string>
}
