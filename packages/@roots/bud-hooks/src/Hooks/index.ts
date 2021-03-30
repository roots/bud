import {Hooks} from '@roots/bud-typings'
import {Framework, Service} from '@roots/bud-framework'
import {isArray, prettyFormat} from '@roots/bud-support'
import {set} from 'lodash'

/**
 * Hooks
 */
export default class extends Service implements Hooks {
  /**
   * Service name
   */
  public name = '@roots/bud-hooks'

  /**
   * Get hook
   */
  public get<T = any>(path: `${Framework.Hooks.Name}`) {
    return this._.get(this.repository, path) as T
  }

  /**
   * Set hook
   */
  public set(key: `${Framework.Hooks.Name}`, value: any): this {
    set(this.repository, key, value)

    return this
  }

  /**
   * ## hooks.on
   *
   * Register a function to filter a value.
   *
   * If a filter calls for this name the function is then run,
   * passing whatever data along for modification. If more than one
   * hook is registered to a name, they will be called sequentially
   * in the order they were registered, with each hook's output used
   * as the input for the next.
   *
   * ### Usage
   *
   * ```js
   * app.hooks.on(
   *   'namespace.name.value',
   *   value => 'replaced by this string',
   * )
   * ```
   */
  public on(
    id:
      | [string, `${Framework.Hooks.Name}`]
      | `${Framework.Hooks.Name}`,
    callback: Hooks.Hook,
  ): Framework {
    const [publisher, name] = isArray(id)
      ? id
      : ['anonymous', id]

    if (!this.isArray(name)) {
      this.set(name, [() => this._.noop])
    }

    this.set(name, [...this.get(name), callback])

    this.logger.scope(name, publisher).success({
      message: `${name} updated`,
    })

    return this.app
  }

  /**
   * ## hooks.filter
   *
   * The other side of bud.hooks.on. Passes a key and a value. If
   * any filters are registered on that key they will transform
   * the output before it is returned.
   */
  public filter<T = any>(
    id:
      | `${Framework.Hooks.Name}`
      | [string, `${Framework.Hooks.Name}`],
  ): T {
    const [subscriber, name] = isArray(id)
      ? id
      : ['anonymous', id]

    if (!this.has(name)) {
      this.set(name, [])
    }

    const result = this.get(name).reduce(
      (v: T, cb?: CallableFunction) => {
        return cb && this._.isFunction(cb) ? cb(v) : cb
      },
      null,
    )

    this.logger.scope(name, subscriber).success({
      message: `${name} retrieved`,
      suffix: prettyFormat(result, {
        highlight: true,
      }),
    })

    return result
  }
}
