import * as Framework from '@roots/bud-framework'
import type {
  AsyncMap,
  Events,
} from '@roots/bud-framework/types/services/hooks'
import {bind, chalk, lodash} from '@roots/bud-support'

const {get, isFunction, isUndefined, set} = lodash

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
  extends Framework.ContainerService
  implements Framework.Hooks.Service
{
  /**
   * hook getter
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public get<T = any>(path: `${keyof Framework.Hooks.Map & string}`) {
    return get(this.repository, path) as T
  }

  /**
   * hook setter
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public set(
    key: `${keyof Framework.Hooks.Map & string}`,
    value: any,
  ): this {
    set(this.repository, key, value)
    return this
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
  public on<T extends keyof Framework.Hooks.Map & string>(
    id: T,
    input:
      | Framework.Hooks.Map[T]
      | ((value: Framework.Hooks.Map[T]) => any),
  ): Framework.Bud {
    const retrieved = this.has(id) ? this.get(id) : []
    const normal = Array.isArray(retrieved) ? retrieved : [retrieved]
    const callback = typeof input === 'function' ? input : () => input

    this.set(id, [...normal, callback])

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
  public async<T extends keyof AsyncMap & string>(
    id: T,
    input: AsyncMap[T] | ((value: AsyncMap[T]) => Promise<AsyncMap[T]>),
  ): Framework.Bud {
    const retrieved = this.has(id) ? this.get(id) : []
    const normal = Array.isArray(retrieved) ? retrieved : [retrieved]
    const callback = typeof input === 'function' ? input : () => input

    this.set(id, [...normal, callback])

    return this.app
  }

  /**
   * Hooks filter
   *
   * @remarks
   * The other side of bud.hooks.on. Passes a key and a value. If
   * any filters are registered on that key they will transform
   * the output before it is returned.
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
  public filter<T extends keyof Framework.Hooks.Map & string>(
    id: T,
    value?:
      | Framework.Hooks.Map[T]
      | ((value?: Framework.Hooks.Map[T]) => any),
  ): Framework.Hooks.Map[T] {
    if (!this.has(id)) {
      if (isUndefined(value)) return undefined
      return isFunction(value) ? value() : value
    }

    const retrieved = this.get(id) ?? []
    const normal = Array.isArray(retrieved) ? retrieved : [retrieved]

    return normal.reduce(
      (
        accumulated: Framework.Hooks.Map[T],
        current?:
          | ((value: Framework.Hooks.Map[T]) => Framework.Hooks.Map[T])
          | Framework.Hooks.Map[T],
      ) => {
        const next = isFunction(current) ? current(accumulated) : current
        if (this.app.context.args.debug)
          this.app.info(`hooks.filter`, id, `=>`, next)
        return next
      },
      value,
    )
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
  public async filterAsync<T extends keyof AsyncMap & string>(
    id: T,
    value?: AsyncMap[T] | ((value?: AsyncMap[T]) => any),
  ): Promise<AsyncMap[T]> {
    if (!this.has(id)) {
      if (isUndefined(value)) return
      return isFunction(value) ? await value() : value
    }

    const retrieved = this.get(id) ?? []
    const normal = Array.isArray(retrieved) ? retrieved : [retrieved]

    return await normal.reduce(
      async (
        promised,
        current?: ((value: T) => Promise<T> | AsyncMap[T]) | AsyncMap[T],
      ) => {
        const value = await promised
        return isFunction(current) ? await current(value) : current
      },
      value,
    )
  }

  /**
   * Register an action (called with {@link Hooks.fire})
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public action<T extends keyof Events & string>(
    id: T,
    ...action: Array<(app: Framework.Bud) => Promise<unknown>>
  ): Framework.Bud {
    const retrieved = this.has(id) ? this.get(id) : []
    const normal = Array.isArray(retrieved) ? retrieved : [retrieved]

    this.app.info({
      message: `registering action: ${id}`,
      suffix: chalk.dim(`${normal.length + 1} registered`),
    })

    this.set(id, [...normal, ...action])

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
  public async fire<T extends keyof Events & string>(id: T): Promise<Framework.Bud> {
    if (!this.has(id)) return

    const retrieved = this.get(id)
    const normal = Array.isArray(retrieved) ? retrieved : [retrieved]

    await normal.reduce(async (promised, current, increment) => {
      await promised

      this.app.info({
        message: `firing action ${id}`,
        suffix: chalk.dim(`${increment + 1}/${normal.length}`),
      })

      return await current(this.app)
    }, Promise.resolve())

    return this.app
  }
}
