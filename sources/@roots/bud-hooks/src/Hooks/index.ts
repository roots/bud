import * as Framework from '@roots/bud-framework'
import {Registry, Store} from '@roots/bud-framework'
import {bind, lodash} from '@roots/bud-support'
import {isUndefined} from 'lodash'

const {isFunction} = lodash

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
export class Hooks
  extends Framework.Service
  implements Framework.Hooks.Service
{
  /**
   * Hooks store
   *
   * @public
   */
  public store = {} as Hooks['store']

  /**
   * Class constructor
   *
   * @param app - Bud instance
   * @public
   */
  public constructor(app: Framework.Bud) {
    super(app)
    this.store = app.options.seed
  }

  /**
   * Get stored value
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public get<T extends `${keyof Store & string}`>(path: T): Store[T] {
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
  public set<T extends `${keyof Store & string}`>(
    path: T,
    value: Store[T],
  ): this {
    if (this.store[path])
      this.store[path] = [...this.store[path], ...value]
    else this.store[path] = value
    return this
  }

  /**
   * Not type safe but very convenient
   * to check if a hook has been set somewhere
   */
  @bind
  public has<T extends `${keyof Store & string}`>(path: T): boolean {
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
  public on<T extends `${keyof Registry.Sync & string}`>(
    id: T,
    input:
      | Registry.Sync[T]
      | ((current?: Registry.Sync[T]) => Registry.Sync[T]),
  ): Framework.Bud {
    const inputFn: (current?: Registry.Sync[T]) => Registry.Sync[T] =
      typeof input === 'function' ? input : () => input

    this.app.info(`hooks.on`, id, input)
    this.set(id, [inputFn])

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
  public async<T extends `${keyof Registry.Async & string}`>(
    id: T,
    input:
      | Registry.Async[T]
      | ((current?: Registry.Async[T]) => Promise<Registry.Async[T]>),
  ): Framework.Bud {
    const inputFn = typeof input === 'function' ? input : async () => input

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
  public filter<T extends keyof Registry.Sync & string>(
    id: T,
    fallback?:
      | Registry.Sync[T]
      | ((value?: Registry.Sync[T]) => Registry.Sync[T]),
  ): Registry.Sync[T] {
    if (!this.has(id)) return isFunction(fallback) ? fallback() : fallback

    const result = (this.store[id] ?? []).reduce(
      (
        accumulated: Registry.Sync[T],
        current: (value?: Registry.Sync[T]) => Registry.Sync[T],
      ): Registry.Sync[T] => current(accumulated),
      isFunction(fallback) ? fallback() : fallback,
    )

    this.app.info(`hooks.filter`, id, result)

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
  public async filterAsync<T extends `${keyof Registry.Async & string}`>(
    id: T,
    fallback?: Registry.Async[T],
  ): Promise<Registry.Async[T]> {
    if (!this.has(id))
      return isFunction(fallback) ? await fallback() : fallback

    const result = await (this.store[id] ?? []).reduce(
      async (
        accumulated,
        current?: ((fallback: T) => Promise<T> | Store[T]) | Store[T],
      ) => {
        const next = await accumulated
        return isFunction(current) ? await current(next) : current
      },
      fallback,
    )

    this.app.info(`hooks.filterAsync`, id, result)

    return result
  }

  /**
   * Register an action (called with {@link Hooks.fire})
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public action<T extends keyof Registry.Events & keyof Store & string>(
    id: T,
    ...actions: Array<(app?: Framework.Bud) => Promise<unknown>>
  ): Framework.Bud {
    const value = this.store[id] ?? []

    actions.forEach(action => value.push(action as any))

    this.app.info({message: `registering action: ${id}`})

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
    T extends keyof Registry.Events & keyof Store & string,
  >(id: T): Promise<Framework.Bud> {
    if (!this.has(id)) return

    const retrieved = this.get(id)

    await retrieved.reduce(async (promised, current) => {
      await promised

      this.app.info(`firing action ${id}`)

      return await current(this.app)
    }, Promise.resolve())

    return this.app
  }
}
