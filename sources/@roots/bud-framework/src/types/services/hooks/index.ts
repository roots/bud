import type {Bud} from '../../../bud.js'
import type {Service as BaseService} from '../../../service.js'
import type * as Registry from '../../registry/index.js'

/**
 * Hooks service
 */
export default interface Hooks extends BaseService {
  /**
   * Async hooks value store
   */
  asyncStore: any
  /**
   * Sync hooks value store
   */
  syncStore: any

  /**
   * Events value store
   */
  events: any

  hasSyncHook: (hook: keyof Registry.SyncStore) => boolean

  hasAsyncHook: (hook: keyof Registry.AsyncStore) => boolean

  hasEvent: (hook: keyof Registry.EventsStore) => boolean

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
   */
  on: <T extends `${keyof Registry.SyncStore & string}`>(
    id: T,
    input: Registry.SyncCallback[T],
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
   */
  fromMap: (map: Partial<Registry.SyncCallback>) => Bud

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
   */
  async: <T extends keyof Registry.AsyncStore>(
    id: T,
    value: Registry.AsyncCallback[T],
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
   */
  fromAsyncMap: (map: Registry.AsyncCallback) => Bud

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
   */
  filter: <T extends keyof Registry.SyncStore>(
    id: T,
    callback?: Registry.SyncCallback[T],
  ) => Registry.SyncRegistry[T]

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
   */
  filterAsync: <T extends keyof Registry.AsyncRegistry & string>(
    id: T,
    fallback?: Registry.AsyncCallback[T],
  ) => Promise<Registry.AsyncRegistry[T]>

  /**
   * Execute an action
   */
  fire: <T extends `${keyof Registry.Events & string}`>(
    id: T,
    obj: Registry.Events[T],
  ) => Promise<Bud>

  /**
   * Store callback to an action handler
   */
  action: <T extends keyof Registry.Events & string>(
    id: T,
    ...input: Array<Registry.EventsCallback<T>>
  ) => Bud
}
