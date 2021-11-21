import {
  Framework,
  Hooks as Contract,
  Project,
  Service,
} from '@roots/bud-framework'
import {bind, lodash} from '@roots/bud-support'

const {get, isArray, isFunction, noop, set} = lodash

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
 * await hooks.promised('my-event-name', async () => DEFAULT_VALUE)
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
   * Service boot method
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public async boot() {
    this.app.hooks.on(
      'event.project.write',
      async (project: Project.Interface) =>
        project.set('hooks', this.all()),
    )
  }

  /**
   * hook getter
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public get<T = any>(path: `${Contract.Name & string}`) {
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
    key: `${Contract.Name & string}`,
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
   *   'namespace.name.value',
   *   value => 'replaced by this string',
   * )
   * ```
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public on(
    id: Contract.Name,
    callback: Contract.Hook,
  ): Framework {
    const [_publisher, name] = isArray(id)
      ? id
      : ['anonymous', id]

    const current = this.get(name) ?? []

    if (!isArray(current)) {
      this.set(name, [callback])
    } else {
      this.set(name, [...current, callback])
    }

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
   *   'namespace.name.event',
   *   ['array', 'of', 'items'],
   * )
   * ```
   *
   * @public
   */
  @bind
  public filter<T = any>(
    id: `${Contract.Name & string}`,
    value?: any,
  ): T {
    const [_subscriber, name] = isArray(id)
      ? id
      : ['anonymous', id]

    !this.has(name) && this.set(name, [value ?? noop])

    const result = this.get(name).reduce(
      (v: T, cb?: CallableFunction) => {
        return isFunction(cb) ? cb(v) : cb
      },
      value ?? null,
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
   *   'namespace.name.event',
   *   ['array', 'of', 'items'],
   * )
   * ```
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async promised<T = any>(
    id: `${Contract.Name & string}`,
    value?: any,
  ): Promise<T> {
    const [_subscriber, name] = isArray(id)
      ? id
      : ['anonymous', id]

    !this.has(name) && this.set(name, [value ?? noop])

    const result = await this.get(name).reduce(
      async (
        promised: Promise<T>,
        cb?: (value: T) => Promise<T>,
      ) => {
        const value = await promised

        return isFunction(cb) ? await cb(value) : cb
      },
      value ?? null,
    )

    return result
  }
}
