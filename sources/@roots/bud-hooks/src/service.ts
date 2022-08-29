import type {Bud} from '@roots/bud-framework/bud'
import type {
  Async,
  AsyncCallback,
  AsyncStore,
  EventsStore,
  Store,
  Sync,
  SyncCallback,
  SyncStore,
} from '@roots/bud-framework/lib/registry'
import {Service} from '@roots/bud-framework/service'
import type {Service as HooksInterface} from '@roots/bud-framework/services/hooks'
import {bind} from 'helpful-decorators'
import {isFunction, isUndefined} from 'lodash-es'

/**
 * Hooks and events registry
 *
 * @remarks
 * Supports async and sync value hooks as well as asyncronous events.
 *
 * @example
 * Add a new entry to the `webpack.externals` configuration:
 *
 * ```ts
 * hooks.on(
 *   'build.externals',
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
 * @example
 * Filter a value through any registered hooks:
 *
 * ```ts
 * hooks.filter('build.output.filename', DEFAULT_VALUE)
 * ```
 *
 * @example
 * Filter an async value through any registered hooks:
 *
 * ```ts
 * await hooks.filterAsync('my-event-name', async () => DEFAULT_VALUE)
 * ```
 *
 * @public
 */
export default class Hooks extends Service implements HooksInterface {
  /**
   * Service label
   *
   * @public
   */
  public static label = `hooks`

  /**
   * Hooks store
   *
   * @public
   */
  public store: Partial<Store> = {}

  /**
   * Not type safe but very convenient
   * to check if a hook has been set somewhere
   */
  @bind
  public has<T extends keyof Store & string>(path: T): boolean {
    return !isUndefined(this.store[path]) ? true : false
  }

  /**
   * Register a function to filter a value.
   *
   * @remarks
   * If a filter calls for this name the function is then run,
   * passing whatever data along for modification. If more than one
   * hook is registered to a name, they will be called sequentially
   * in the order they were registered, with each hook's output used
   * as the input for the next.
   *
   * @example
   * ```js
   * app.hooks.on(
   *   'namespace.key',
   *   value => 'replaced by this string',
   * )
   * ```
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public on<T extends keyof SyncStore & string>(
    id: T,
    input: SyncCallback[T],
  ): Bud {
    if (!isFunction(input)) this.store[id] = [() => input]
    else if (this.has(id)) this.store[id].push(input)
    else this.store[id] = [input]
    return this.app
  }

  @bind
  public fromMap<K extends keyof SyncStore>(
    map: Partial<SyncCallback>,
  ): Bud {
    Object.entries(map).map(([k, v]: [K, SyncStore[K]]) => this.on(k, v))

    return this.app
  }

  /**
   * Register a function to filter a value.
   *
   * @remarks
   * If a filter calls for this name the function is then run,
   * passing whatever data along for modification. If more than one
   * hook is registered to a name, they will be called sequentially
   * in the order they were registered, with each hook's output used
   * as the input for the next.
   *
   * @example
   * ```js
   * app.hooks.on(
   *   'namespace.key',
   *   value => 'replaced by this string',
   * )
   * ```
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async<T extends keyof AsyncStore>(
    id: T,
    value: AsyncCallback[T],
  ): Bud {
    if (!isFunction(value)) {
      this.store[id] = [async () => value] as AsyncStore[T]
      return this.app
    }

    if (this.has(id)) {
      this.store[id] = [...this.store[id], value] as AsyncStore[T]
      return this.app
    }

    this.store[id] = [value] as AsyncStore[T]

    return this.app
  }

  @bind
  public fromAsyncMap(map: AsyncCallback): Bud {
    Object.entries(map).map(([k, v]: any) => this.async(k, v))
    return this.app
  }

  /**
   * Filter sync value
   *
   * @remarks
   * Will filter a sync value
   *
   * @example
   * ```js
   * bud.hooks.filter(
   *   'namespace.Key.event',
   *   ['array', 'of', 'items'],
   * )
   * ```
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public filter<T extends keyof SyncStore & string>(
    id: T,
    fallback?: SyncCallback[T],
  ): Sync[T] {
    if (!this.has(id)) return isFunction(fallback) ? fallback() : fallback

    const result = (
      (Array.isArray(this.store[id])
        ? this.store[id]
        : ([this.store[id]] as any)) ?? []
    ).reduce(
      (
        accumulated: Sync[T],
        current: (value?: Sync[T]) => Sync[T],
      ): Sync[T] => (isFunction(current) ? current(accumulated) : current),
      fallback,
    )

    return result
  }

  /**
   * Asyncronous hook filter
   *
   * @remarks
   * This method is used to filter a hook event.
   *
   * @example
   * ```js
   * bud.hooks.filter(
   *   'namespace.Key.event',
   *   ['array', 'of', 'items'],
   * )
   * ```
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async filterAsync<T extends keyof AsyncStore>(
    id: T,
    fallback?: Async[T],
  ): Promise<Async[T]> {
    if (!this.has(id))
      return isFunction(fallback) ? await fallback() : fallback

    const result = await ((this.store[id] as any) ?? []).reduce(
      async (
        accumulated,
        current?: ((fallback: T) => Promise<T> | Store[T]) | Store[T],
      ) => {
        const next = await accumulated
        return isFunction(current) ? await current(next) : current
      },
      fallback,
    )

    return result
  }

  /**
   * Register an action
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public action<T extends keyof EventsStore & string>(
    id: T,
    ...actions: EventsStore[T]
  ): Bud {
    if (!this.has(id)) this.store[id] = []
    this.store[id].push(...actions)

    return this.app
  }

  /**
   * Fire actions registered to an event.
   *
   * @example
   * ```js
   * await app.hooks.fire('namespace.key')
   * ```
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async fire<T extends keyof EventsStore & string>(
    id: T,
  ): Promise<Bud> {
    if (!this.store[id] || this.store[id]?.length === 0) return this.app

    const value = this.store[id] as any
    const length = value.length

    await value
      .reduce(async (promise, action) => {
        await promise
        try {
          this.app.info(`calling`, id, action)
          await action(this.app)
        } catch (error) {
          this.app.error(error)
        }
      }, Promise.resolve())
      .catch(error => this.app.error(error))
      .finally(() => {
        this.app.success(
          `${length} actions registered to '${id}' completed without errors`,
        )
        this.store[id] = []
      })

    this.store[id] = []

    return this.app
  }
}
