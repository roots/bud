import {
  Framework,
  Hooks as Contract,
  Service,
} from '@roots/bud-framework'
import {bind, lodash} from '@roots/bud-support'

const {get, isArray, isFunction, noop, set} = lodash

export class Hooks extends Service implements Contract {
  /**
   * @public
   */
  public name = 'hooks'

  @bind
  public get<T = any>(path: `${Contract.Name & string}`) {
    return get(this.repository, path) as T
  }

  @bind
  public set(
    key: `${Contract.Name & string}`,
    value: any,
  ): this {
    set(this.repository, key, value)
    return this
  }

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

  @bind
  public promise(
    id: Contract.Name,
    callback: Contract.PromiseHook,
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
