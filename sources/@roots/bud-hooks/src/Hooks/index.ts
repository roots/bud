import {Framework, Hooks as Contract, Service} from '@roots/bud-framework'
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
export class Hooks extends Service implements Contract {
  /**
   * @internal
   */
  public ident = 'hooks'

  /**
   * hook getter
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public get<T = any>(path: `${keyof Contract.Map & string}`) {
    return get(this.repository, path) as T
  }

  /**
   * hook setter
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public set(key: `${keyof Contract.Map & string}`, value: any): this {
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
  public on<T extends keyof Contract.Map & string>(
    id: T,
    input: Contract.Map[T] | ((value: Contract.Map[T]) => any),
  ): Framework {
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
  public async<T extends keyof Contract.AsyncMap & string>(
    id: T,
    input:
      | Contract.AsyncMap[T]
      | ((value: Contract.AsyncMap[T]) => Promise<Contract.AsyncMap[T]>),
  ): Framework {
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
  public filter<T extends keyof Contract.Map & string>(
    id: T,
    value?: Contract.Map[T] | ((value?: Contract.Map[T]) => any),
  ): Contract.Map[T] {
    if (!this.has(id)) {
      if (isUndefined(value)) return undefined
      return isFunction(value) ? value() : value
    }

    const retrieved = this.get(id) ?? []
    const normal = Array.isArray(retrieved) ? retrieved : [retrieved]

    return normal.reduce(
      (
        accumulated: Contract.Map[T],
        current?:
          | ((value: Contract.Map[T]) => Contract.Map[T])
          | Contract.Map[T],
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
  public async filterAsync<T extends keyof Contract.AsyncMap & string>(
    id: T,
    value?: Contract.AsyncMap[T] | ((value?: Contract.AsyncMap[T]) => any),
  ): Promise<Contract.AsyncMap[T]> {
    if (!this.has(id)) {
      if (isUndefined(value)) return
      return isFunction(value) ? await value() : value
    }

    const retrieved = this.get(id) ?? []
    const normal = Array.isArray(retrieved) ? retrieved : [retrieved]

    return await normal.reduce(
      async (
        promised,
        current?:
          | ((value: T) => Promise<T> | Contract.AsyncMap[T])
          | Contract.AsyncMap[T],
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
  public action<T extends keyof Contract.Events & string>(
    id: T,
    ...action: Array<(app: Framework) => Promise<unknown>>
  ): Framework {
    const retrieved = this.has(id) ? this.get(id) : []
    const normal = Array.isArray(retrieved) ? retrieved : [retrieved]

    this.app.log({
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
  public async fire<T extends keyof Contract.Events & string>(
    id: T,
  ): Promise<Framework> {
    if (!this.has(id)) return

    const retrieved = this.get(id)
    const normal = Array.isArray(retrieved) ? retrieved : [retrieved]

    await normal.reduce(async (promised, current, increment) => {
      await promised

      this.app.log({
        message: `firing action ${id}`,
        suffix: chalk.dim(`${increment + 1}/${normal.length}`),
      })

      return await current(this.app)
    }, Promise.resolve())

    return this.app
  }
}
