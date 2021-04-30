import {Framework, Hooks, Service} from '@roots/bud-framework'
import prettyFormat from 'pretty-format'
import _ from 'lodash'
import {boundMethod as bind} from 'autobind-decorator'

export default class extends Service implements Hooks {
  public name = '@roots/bud-hooks'

  @bind
  public get<T = any>(path: `${Hooks.Name & string}`) {
    return _.get(this.repository, path) as T
  }

  @bind
  public set(key: `${Hooks.Name & string}`, value: any): this {
    _.set(this.repository, key, value)

    return this
  }

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
