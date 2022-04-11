import {Registry} from '@roots/bud-framework'
import * as Framework from '@roots/bud-framework'
import {bind, chalk, lodash} from '@roots/bud-support'

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
export class Hooks extends Framework.Service implements Framework.Hooks.Service {
  public store: Partial<Registry.RegistryStore> = {}

  /**
   * hook getter
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public get<T extends `${keyof Registry.RegistryStore & string}`>(
    path: T,
  ): Registry.RegistryStore[T] {
    return this.store[path]
  }

  /**
   * hook setter
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public set<T extends `${keyof Registry.RegistryValue & string}`>(
    path: T,
    value: Registry.RegistryStore[T],
  ): this {
    this.store[path] = value
    return this
  }

  /**
   * hook setter
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public has<T extends `${keyof Registry.RegistryStore & string}`>(
    path: T,
  ): boolean {
    return this.store[path] ? true : false
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
  public on<T extends keyof Registry.RegistryStore & string>(
    id: T,
    input: Registry.RegistryValue[T] | ((current?: Registry.RegistryValue[T]) => Registry.RegistryValue[T]),
  ): Framework.Bud {
    const value = this.has(id) ? this.get(id) : []

    if (!Array.isArray(value)) {
      this.app.error(
        '\n',
        id,
        'is not an array (but it should be)\n',
        'value retrieved:',
        value,
        '\nnext value:',
        input,
      )
    }

    value.push(input)

    this.app.info(`hooks.on`, id, input)
    this.set(id, value)

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
  public async<T extends keyof Registry.AsyncRecord & keyof Registry.RegistryStore & string>(
    id: T,
    callback: Registry.AsyncRecord[T]
  ): Framework.Bud {
    const value = this.has(id) ? this.get<T>(id) : []
    value.push(callback)

    this.app.info(`hooks.async`, id, value)
    this.set<T>(id, value)

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
  public filter<T extends keyof Registry.RegistryValue & string>(
    id: T,
    value?: Registry.RegistryValue[T] | ((value?: Registry.RegistryValue[T]) => any),
  ): Registry.RegistryValue[T] {
    if (!this.has(id)) return isFunction(value) ? value() : value

    const retrieved = this.get(id) ?? []
    const normal = Array.isArray(retrieved) ? retrieved : [retrieved]

    const result = normal.reduce(
      (
        accumulated: Registry.RegistryValue[T],
        current?:
          | ((value: Registry.RegistryValue[T]) => Registry.RegistryValue[T])
          | Registry.RegistryValue[T],
      ) => (isFunction(current) ? current(accumulated) : current),
      value,
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
  public async filterAsync<T extends keyof Registry.AsyncRecord & string>(
    id: T,
    value?: Registry.RegistryValue[T],
  ): Promise<Registry.RegistryValue[T]> {
    if (!this.has(id)) return isFunction(value) ? await value() : value

    const retrieved = this.get(id) ?? []
    const arrayed = Array.isArray(retrieved) ? retrieved : [retrieved]

    const result = await arrayed.reduce(
      async (
        promised,
        current?:
          | ((value: T) => Promise<T> | Registry.AsyncRecord[T])
          | Registry.AsyncRecord[T],
      ) => {
        const next = await promised
        return isFunction(current) ? await current(next) : current
      },
      value,
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
  public action<T extends keyof Registry.StoreMap<Registry.Events, 'event'> &
      keyof Registry.RegistryStore &
      string>(
    id: T,
    ...actions: Array<Registry.RegistryValue[T]>
  ): Framework.Bud {
    const value = this.has(id) ? this.get(id) : []

    actions.forEach(action => value.push(action))

    this.app.info({
      message: `registering action: ${id}`,
      suffix: chalk.dim(`${value.length + 1} registered`),
    })

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
  public async fire<T extends keyof Registry.ValueMap<Registry.Events, 'event'> & string>(
    id: T,
  ): Promise<Framework.Bud> {
    if (!this.has(id)) return

    const retrieved = this.get<T>(id)

    await retrieved.reduce(async (promised, current: (app: Framework.Bud) => Promise<unknown>) => {
      await promised

      this.app.info(`firing action ${id}`)

      return await current(this.app)
    }, Promise.resolve())

    return this.app
  }
}
