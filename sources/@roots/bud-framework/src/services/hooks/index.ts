import * as Framework from '../..'
import {Bud} from '../..'
import * as Registry from '../../registry'

/**
 * Assign and filter callback to values.
 *
 * @example
 * Add a new entry to the `webpack.externals` configuration:
 *
 * ```ts
 * hooks.on(
 *   'build/externals',
 *   externals => ({
 *     ...externals,
 *     $: 'jquery',
 *   }),
 * )
 * ```
 *
 * @example
 * Change the `webpack.output.filename` format:
 *
 * ```ts
 * hooks.on(
 *   'build.output.filename',
 *   () => '[name].[hash:4]',
 * )
 * ```
 *
 * @public
 */
export interface Service extends Framework.Service {
  store: Partial<Registry.RegistryStore>


  /**
   * hook getter
   *
   * @internal
   * @decorator `@bind`
   */
  get<T extends `${keyof Registry.RegistryStore & string}`>(
    path: T,
  ): Registry.RegistryStore[T]

  /**
   * hook setter
   *
   * @internal
   * @decorator `@bind`
   */
  set<T extends `${keyof Registry.RegistryValue & string}`>(
    path: T,
    value: Registry.RegistryStore[T],
  ): Service

  /**
   * hook setter
   *
   * @internal
   * @decorator `@bind`
   */
  has<T extends `${keyof Registry.RegistryStore & string}`>(
    path: T,
  ): boolean

  /**
   * Register a function to modify a filtered value
   *
   * @example
   * ```js
   * app.hooks.on(
   *   'namespace.name.value',
   *   value => 'replaced by this string',
   * )
   * ```
   *
   * @public
   */
  on<T extends keyof Registry.SyncValue & string>(
    id: T,
    callback?:
      | ((param?: Registry.SyncValue[T]) => Registry.SyncValue[T])
      | Registry.SyncValue[T],
  ): Bud

  /**
   * Register an async function to filter a value.
   *
   * @example
   * ```js
   * app.hooks.on(
   *   'namespace.name.value',
   *   value => 'replaced by this string',
   * )
   * ```
   *
   * @public
   */
  async<
    T extends keyof Registry.AsyncStore &
      keyof Registry.RegistryStore &
      string,
  >(
    id: T,
    callback: Registry.AsyncRecord[T],
  ): Framework.Bud

  /**
   * Filter a value
   *
   * @example
   * ```js
   * bud.hooks.filter(
   *   'namespace.name.event',
   *   ['array', 'of', 'items'],
   * )
   * ```
   *
   * @public
   */
  filter<
    T extends `${keyof Registry.SyncStore &
      keyof Registry.RegistryStore &
      string}`,
  >(
    id: T,
    value?: Registry.SyncValue[T]
  ): Registry.SyncValue[T]

  /**
   * Async version of hook.filter
   *
   * @remarks
   * Hooks are processed as a waterfall.
   *
   * @example
   * ```js
   * bud.hooks.filter(
   *   'namespace.name.event',
   *   ['array', 'of', 'items'],
   * )
   * ```
   *
   * @public
   */
  filterAsync<T extends keyof Registry.AsyncRecord & string>(
    id: T,
    value?: Registry.RegistryValue[T]
  ): Promise<Registry.RegistryValue[T]>

  /**
   * Execute an action
   *
   * @public
   */
  fire<
    T extends keyof Registry.StoreMap<Registry.Events, 'event'> &
      keyof Registry.RegistryStore &
      string,
  >(
    id: T,
  ): Promise<Framework.Bud>

  /**
   * Registry callback to an action handler
   *
   * @public
   */
  action<T extends keyof Registry.StoreMap<Registry.Events, 'event'> &
      keyof Registry.RegistryStore &
      string>(
    id: T,
    ...action: Array<(app: Bud) => Promise<unknown>>
  ): Bud
}