import Service from './Service'
import {Hooks as Contract} from '@roots/bud-typings'

/**
 * Hooks
 */
export class Hooks extends Service implements Contract {
  /**
   * Service ident
   */
  public name = 'hooks'

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
    name: string,
    filter: Contract.Filter.Fn<T>,
  ) {
    this.info({name, msg: 'Filter registered'})
    this.set(
      `filters.${name}`,
      this.get(`filters.${name}`)
        ? [...this.get(`filters.${name}`), filter]
        : [filter],
    )

    return this.app.get()
  }

  /**
   * ## hooks.filter
   *
   * The other side of bud.hooks.on. Passes a key and a value. If
   * any filters are registered on that key they will transform
   * the output before it is returned.
   */
  public filter<T = any>(name: string, value: T): T {
    this.info({name, msg: 'Filter called'})

    return this.has(`filters.${name}`) &&
      this.isArray(`filters.${name}`)
      ? this.get(`filters.${name}`).reduce((v, f) => f(v), value)
      : value
  }

  /**
   * ## hooks.when
   *
   * Register a function to execute during a framework lifecycle event.
   *
   * If an action calls for the supplied key, the function will be run.
   * If more than one action is registered to a key, they will be called
   * sequentially in the order they were registered.
   *
   * ### Usage
   *
   * ```js
   * app.hooks.when(
   *   'namespace.name.event',
   *   (app, value) {
   *     console.log(value)
   *   },
   * )
   * ```
   */
  public when<T = any>(
    name: string,
    action: Contract.Action.Fn<T>,
  ) {
    this.info({name, msg: 'Action registered'})

    this.set(
      `actions.${name}`,
      this.get(`actions.${name}`)
        ? [...this.get(`actions.${name}`), action]
        : [action],
    )

    return this.app
  }

  /**
   * ## hooks.action
   *
   * The other side of bud.hooks.when. Passes a key and a value. If
   * any actions are registered on that key they will transform
   * the output before it is returned.
   */
  public action(name: string): void {
    this.has(`actions.${name}`) &&
      this.get(`actions.${name}`).reduce((v, f) =>
        f.bind(this.app)(),
      )
  }
}
