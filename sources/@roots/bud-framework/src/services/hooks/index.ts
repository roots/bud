import type {Bud} from '../../bud.js'
import type * as Framework from '../../index.js'
import type {
  Async,
  AsyncCallback,
  AsyncStore,
  EventsStore,
  Store,
  Sync,
  SyncCallback,
  SyncStore,
} from '../../registry/index.js'

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
  store: Partial<Store>

  /**
   * hook setter
   *
   * @internal
   * @decorator `@bind`
   */
  has(path: string): boolean

  /**
   * Register a function or value to modify or replace a filtered value
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
  on<T extends keyof Sync & string>(
    id: T,
    input: SyncCallback[T],
  ): Framework.Bud

  /**
   * Register a recordset of functions or values to modify or replace existing values
   *
   * @example
   * ```js
   * app.hooks.fromMap({
   *  'namespace.name.value': 'replaced by this string',
   * 'namespace.name.value2': value => value.push('modified by this string'),
   * })
   * ```
   *
   * @public
   */
  fromMap(map: Partial<SyncCallback>): Framework.Bud

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
  async<T extends keyof AsyncCallback & string>(
    id: T,
    value: AsyncCallback[T],
  ): Bud

  /**
   * Register a recordset of functions or values to modify or replace existing values
   *
   * @example
   * ```js
   * app.hooks.fromAsyncMap({
   *  'namespace.name.value': 'replaced by this string',
   * 'namespace.name.value2': async value => value.push('modified by this string'),
   * })
   * ```
   *
   * @public
   */
  fromAsyncMap(map: AsyncCallback): Bud

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
  filter<T extends keyof SyncStore>(
    id: T,
    callback?: SyncCallback[T],
  ): Sync[T]

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
  filterAsync<T extends keyof AsyncStore>(
    id: T,
    fallback?: Async[T],
  ): Promise<Async[T]>

  /**
   * Execute an action
   *
   * @public
   */
  fire<T extends `${keyof EventsStore & string}`>(
    id: T,
  ): Promise<Framework.Bud>

  /**
   * Store callback to an action handler
   *
   * @public
   */
  action<T extends keyof EventsStore & string>(
    id: T,
    ...actions: EventsStore[T]
  ): Bud
}
