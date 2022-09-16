import type {Bud} from '../../bud'
import type {Service as BaseService} from '../../service'
import type * as Hooks from '../registry'

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
export interface Service extends BaseService {
  /**
   * Async hooks value store
   * @public
   */
  asyncStore: any
  /**
   * Sync hooks value store
   * @public
   */
  syncStore: any

  /**
   * Events value store
   * @public
   */
  events: any

  hasSyncHook: (hook: keyof Hooks.SyncStore) => boolean

  hasAsyncHook: (hook: keyof Hooks.AsyncStore) => boolean

  hasEvent: (hook: keyof Hooks.EventsStore) => boolean

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
  on: <T extends keyof Hooks.SyncStore & string>(
    id: T,
    input: Hooks.SyncCallback[T],
  ) => Bud

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
  fromMap: (map: Partial<Hooks.SyncCallback>) => Bud

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
  async: <T extends keyof Hooks.AsyncStore>(
    id: T,
    value: Hooks.AsyncCallback[T],
  ) => Bud

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
  fromAsyncMap: (map: Hooks.AsyncCallback) => Bud

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
  filter: <T extends keyof Hooks.SyncStore>(
    id: T,
    callback?: Hooks.SyncCallback[T],
  ) => Hooks.SyncRegistry[T]

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
  filterAsync: <T extends keyof Hooks.AsyncRegistry & string>(
    id: T,
    fallback?: Hooks.AsyncCallback[T],
  ) => Promise<Hooks.AsyncRegistry[T]>

  /**
   * Execute an action
   *
   * @public
   */
  fire: <T extends `${keyof Hooks.EventsStore & string}`>(
    id: T,
  ) => Promise<Bud>

  /**
   * Store callback to an action handler
   *
   * @public
   */
  action: <T extends keyof Hooks.EventsStore & string>(
    id: T,
    ...input: Array<Hooks.EventsCallback>
  ) => Bud
}
