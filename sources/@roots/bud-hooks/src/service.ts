import * as Framework from '@roots/bud-framework'
import {bind} from 'helpful-decorators'
import {isFunction, isUndefined} from 'lodash-es'
import {format} from 'pretty-format'

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
export default class Hooks
  extends Framework.Service
  implements Framework.Hooks.Service
{
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
  public store: Framework.Store = null

  /**
   * Class constructor
   *
   * @param app - Bud instance
   * @public
   * @decorator `@bind`
   */
  @bind
  public async bootstrap(app: Framework.Bud) {
    this.store = {
      ...Object.entries(app.context.seed).reduce(
        (a, [k, v]) => ({...a, [k]: [v]}),
        {},
      ),
    }
  }

  /**
   * Get stored value
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public get<T extends `${keyof Framework.Store & string}`>(
    path: T,
  ): Framework.Store[T] {
    if (!this.store[path]) this.store[path] = []
    return this.store[path]
  }

  /**
   * Set stored value
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public set<T extends keyof Framework.Store>(
    path: T & string,
    value: Framework.Store[T & string],
  ): this {
    if (this.store[path])
      this.store[path] = [...this.store[path], ...value] as any
    else this.store[path] = value
    return this
  }

  /**
   * Not type safe but very convenient
   * to check if a hook has been set somewhere
   */
  @bind
  public has<T extends `${keyof Framework.Store & string}`>(
    path: T,
  ): boolean {
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
  public on<T extends keyof Framework.Registry.Sync & string>(
    id: T,
    input:
      | Framework.Registry.Sync[T]
      | ((
          current?: Framework.Registry.Sync[T],
        ) => Framework.Registry.Sync[T]),
  ): Framework.Bud {
    this.app.info(`hooks.on`, id, input)

    if (!isFunction(input)) this.store[id] = [input]
    else if (this.has(id)) this.store[id].push(input)
    else this.store[id] = [isFunction(input) ? input : () => input]

    this.app.info(`hooks.on`, id, input)

    return this.app
  }

  @bind
  public fromMap<SyncMap extends Framework.Registry.Sync>(map: {
    [K in keyof SyncMap as `${K & string}`]:
      | SyncMap[K]
      | ((current?: SyncMap[K]) => SyncMap[K])
  }): Framework.Bud {
    Object.entries(map).map(([k, v]: any) => this.on(k, v))

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
  public async<T extends `${keyof Framework.Registry.Async & string}`>(
    id: T,
    input:
      | Framework.Registry.Async[T]
      | ((
          current?: Framework.Registry.Async[T],
        ) => Promise<Framework.Registry.Async[T]>),
  ): Framework.Bud {
    const inputFn = typeof input === `function` ? input : async () => input

    this.app.info(`hooks.async`, id, input)
    this.set(id, [inputFn as any])

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
  public filter<T extends keyof Framework.Registry.Sync & string>(
    id: T,
    fallback?: Framework.Registry.Sync[T],
  ): Framework.Registry.Sync[T] {
    if (!this.has(id)) return fallback

    const result = (
      (Array.isArray(this.get(id))
        ? this.get(id)
        : ([this.get(id)] as any)) ?? []
    ).reduce(
      (
        accumulated: Framework.Registry.Sync[T],
        current: (
          value?: Framework.Registry.Sync[T],
        ) => Framework.Registry.Sync[T],
      ): Framework.Registry.Sync[T] =>
        isFunction(current) ? current(accumulated) : current,
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
  public async filterAsync<T extends keyof Framework.Registry.Async>(
    id: T & string,
    fallback?: Framework.Registry.Async[T & string],
  ): Promise<Framework.Registry.Async[T & string]> {
    if (!this.has(id))
      return isFunction(fallback) ? await fallback() : fallback

    const result = await ((this.store[id] as any) ?? []).reduce(
      async (
        accumulated,
        current?:
          | ((fallback: T) => Promise<T> | Framework.Store[T])
          | Framework.Store[T],
      ) => {
        const next = await accumulated
        return isFunction(current) ? await current(next) : current
      },
      fallback,
    )

    return result
  }

  /**
   * Register an action (called with {@link Hooks.fire})
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public action<
    T extends keyof Framework.Registry.Events &
      keyof Framework.Store &
      string,
  >(
    id: T,
    ...actions: Array<(app?: Framework.Bud) => Promise<unknown>>
  ): Framework.Bud {
    const value = this.get(id)

    actions.forEach(action => value.push(action as any))

    this.set(id, value)

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
  public async fire<
    T extends keyof Framework.Registry.Events &
      keyof Framework.Store &
      string,
  >(id: T): Promise<Framework.Bud> {
    if (!this.has(id) || this.get(id).length > 0) return
    const value = this.get(id)

    this.app.info(`firing action ${id}`, format(value))

    await value
      .reduce(async (promise, current, index) => {
        await promise
        await current(this.app)
      }, Promise.resolve())
      .then(() => (this.store[id] = []))

    return this.app
  }
}
