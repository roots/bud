import Service from './Service'
import {Hooks as Contract} from '@roots/bud-typings'
import {isArray} from '@roots/bud-support'
/**
 * Hooks
 */
export class Hooks extends Service implements Contract {
  /**
   * Service ident
   */
  public name = '@roots/bud-hooks'

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
  public on<T = any>(
    id: string | [string, string],
    callback: Contract.Filter.Fn<T>,
  ) {
    const [publisher, name] = isArray(id)
      ? id
      : ['anonymous', id]

    if (!this.has(name)) {
      this.logger
        .scope(publisher)
        .warn('No registered hook for %s', name)
      this.logger
        .scope(publisher)
        .info('Set %s before using it', name)
    }

    if (!this.isArray(name)) {
      this.set(name, [])
    }

    this.set(name, [...this.get(name), callback])

    this.logger.scope(name, publisher).info({
      message: 'updated',
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
  public filter<T = any>(id: string | string[]): void {
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

    this.logger.scope(name, subscriber).info({
      message: 'queried',
    })

    return result
  }
}
