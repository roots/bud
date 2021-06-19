import {Framework, Hooks, Service} from '@roots/bud-framework'
import prettyFormat from 'pretty-format'
import {noop, get, set, isArray, isFunction} from 'lodash'
import {boundMethod as bind} from 'autobind-decorator'

export default class extends Service implements Hooks {
  public name = '@roots/bud-hooks'

  @bind
  public get<T = any>(path: `${Hooks.Name & string}`) {
    return get(this.repository, path) as T
  }

  @bind
  public set(key: `${Hooks.Name & string}`, value: any): this {
    set(this.repository, key, value)
    return this
  }

  @bind
  public on(id: Hooks.Name, callback: Hooks.Hook): Framework {
    const [publisher, name] = isArray(id)
      ? id
      : ['anonymous', id]

    const current = this.get(name)

    if (!isArray(current)) {
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
    id: `${Hooks.Name & string}`,
    value?: any,
  ): T {
    const [subscriber, name] = isArray(id)
      ? id
      : ['anonymous', id]

    !this.has(name) && this.set(name, [value ?? noop])

    const result = this.get(name).reduce(
      (v: T, cb?: CallableFunction) => {
        return isFunction(cb) ? cb(v) : cb
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
          [link]: (() =>
            this.filter(`${target}/${link}` as Hooks.Name))(),
        }),
        {},
      ),
    )

    return this.app
  }
}
