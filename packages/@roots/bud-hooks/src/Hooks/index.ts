import {
  Framework,
  Hooks as Contract,
  Service,
} from '@roots/bud-framework'
import {bind, lodash} from '@roots/bud-support'

const {get, isFunction, isUndefined, set} = lodash

/**
 * Service allowing for fitering values through callbacks.
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
 * @example
 * Create a new filter for a value:
 *
 * ```ts
 * hooks.filter('my-event-name', DEFAULT_VALUE)
 * ```
 *
 * @example
 * Create a new async filter for a value:
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
  public set(
    key: `${keyof Contract.Map & string}`,
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
  public on<T extends keyof Contract.Map & string>(
    id: T,
    callback:
      | Contract.Map[T]
      | ((value: Contract.Map[T]) => any),
  ): Framework {
    const current = this.has(id) ? this.get(id) : []

    this.set(id, [...current, callback])

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
  public async<T extends keyof Contract.Map & string>(
    id: T,
    callback:
      | Contract.Map[T]
      | ((value: Contract.Map[T]) => Promise<Contract.Map[T]>),
  ): Framework {
    const current = this.has(id) ? this.get(id) : []

    this.set(id, [...current, callback])

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
      if (isUndefined(value)) return
      return isFunction(value) ? value() : value
    }

    return this.get(id).reduce(
      (v: T, cb?: CallableFunction) =>
        isFunction(cb) ? cb(v) : cb,
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
  public async filterAsync<
    T extends keyof Contract.Map & string,
  >(
    id: T,
    value?: Contract.Map[T] | ((value?: Contract.Map[T]) => any),
  ): Promise<Contract.Map[T]> {
    if (!this.has(id)) {
      if (isUndefined(value)) return
      return isFunction(value) ? await value() : value
    }

    return await this.get(id).reduce(
      async (
        promised: Promise<T>,
        cb?: (value: T) => Promise<T>,
      ) => {
        const value = await promised
        return isFunction(cb) ? await cb(value) : cb
      },
      value,
    )
  }
}
