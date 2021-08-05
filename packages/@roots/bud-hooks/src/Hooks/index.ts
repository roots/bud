import {
  Framework,
  Hooks as Contract,
  Service,
} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {get, isArray, isFunction, noop, set} from 'lodash'

/**
 * Service: Hooks
 */
class Hooks extends Service implements Contract {
  public name = 'hooks'

  /**
   * Get a hooks value
   * @override
   */
  @bind
  public get<T = any>(path: `${Contract.Name & string}`) {
    return get(this.repository, path) as T
  }

  /**
   * Set a hooks value
   * @override
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
   * @method on
   * {@link Contract.on}
   */
  @bind
  public on(
    id: Contract.Name,
    callback: Contract.Hook,
  ): Framework {
    const [_publisher, name] = isArray(id)
      ? id
      : ['anonymous', id]

    const current = this.get(name)

    if (!isArray(current)) {
      this.set(name, [callback])
    } else {
      this.set(name, [...current, callback])
    }

    return this.app
  }

  /**
   * @method filter
   * {@link Contract.filter}
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
      null,
    )

    return result
  }
}

export {Hooks}
