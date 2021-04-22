import {Framework, Hooks, Service} from '@roots/bud-framework'
import prettyFormat from 'pretty-format'
import _ from 'lodash'
import {boundMethod as bind} from 'autobind-decorator'

/**
 * Hooks
 *
 * [🏡 web](https://roots.io/bud)
 * [🐙 git](https://www.github.com/tree/stable/packages/@roots/bud-hooks)
 * [📦 npm](https://www.npmjs.com/package/@roots/bud-hooks)
 */
export default class extends Service implements Hooks {
  /**
   * Service name
   */
  public name = '@roots/bud-hooks'

  /**
   * Get hook
   */
  @bind
  public get<T = any>(path: `${Hooks.Name & string}`) {
    return _.get(this.repository, path) as T
  }

  /**
   * Set hook
   */
  @bind
  public set(key: `${Hooks.Name & string}`, value: any): this {
    _.set(this.repository, key, value)

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
  @bind
  public on(
    id:
      | [string, `${Hooks.Name & string} & string`]
      | (`${Hooks.Name}` & string),
    callback: Hooks.Hook,
  ): Framework {
    const [publisher, name] = _.isArray(id)
      ? id
      : ['anonymous', id]

    const current = this.get(name)

    if (!_.isArray(current)) {
      this.set(name, [callback])
    } else {
      this.set(name, [...current, callback])
    }

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
  @bind
  public filter<T = any>(
    id:
      | `${Hooks.Name & string}`
      | [string, `${Hooks.Name & string}`],
  ): T {
    const [subscriber, name] = _.isArray(id)
      ? id
      : ['anonymous', id]

    if (!this.has(name)) {
      this.set(name, [_.noop])
    }

    const result = this.get(name).reduce(
      (v: T, cb?: CallableFunction) => {
        return _.isFunction(cb) ? cb(v) : cb
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

  /**
   * hooks.link
   */
  @bind
  public link(
    target: `${Hooks.Name}`,
    links: string[],
  ): Framework {
    this.on(target, () =>
      links.reduce(
        (a, link) => ({
          ...a,
          [link]: (() => this.filter(`${target}/${link}`))(),
        }),
        {},
      ),
    )

    return this.app
  }
}
