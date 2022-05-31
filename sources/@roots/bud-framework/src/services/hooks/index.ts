import {Bud} from '../../bud.js'
import * as Framework from '../../index.js'
import {Registry, Store} from '../../registry/index.js'

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
  store: Store

  /**
   * hook getter
   *
   * @internal
   * @decorator `@bind`
   */
  get<T extends `${keyof Store & string}`>(path: T): Store[T]

  /**
   * hook setter
   *
   * @internal
   * @decorator `@bind`
   */
  set<T extends `${keyof Store & string}`>(path: T, value: Store[T]): this

  /**
   * hook setter
   *
   * @internal
   * @decorator `@bind`
   */
  has(path: string): boolean

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
  on<T extends `${keyof Registry.Sync & keyof Store & string}`>(
    id: T,
    input:
      | Registry.Sync[T]
      | ((current?: Registry.Sync[T]) => Registry.Sync[T]),
  ): Framework.Bud

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
  async<T extends `${keyof Registry.Async & string}`>(
    id: T,
    input:
      | Registry.Async[T]
      | ((current?: Registry.Async[T]) => Promise<Registry.Async[T]>),
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
  filter<T extends `${keyof Registry.Sync & string}`>(
    id: T,
    fallback?: Registry.Sync[T],
  ): Registry.Sync[T]

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
  filterAsync<T extends `${keyof Registry.Async & string}`>(
    id: T,
    fallback?: Registry.Async[T],
  ): Promise<Registry.Async[T]>

  /**
   * Execute an action
   *
   * @public
   */
  fire<T extends `${keyof Registry.Events & string}`>(
    id: T,
  ): Promise<Framework.Bud>

  /**
   * Registry callback to an action handler
   *
   * @public
   */
  action<T extends `${keyof Registry.Events & string}`>(
    id: T,
    ...action: Array<(app?: Bud) => Promise<unknown>>
  ): Bud
}
