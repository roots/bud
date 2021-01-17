import Service from './Service'
import {Hooks as Contract, Webpack} from '@roots/bud-typings'

/**
 * Hooks
 */

export class Hooks extends Service implements Contract {
  /**
   * Register service
   */
  public register() {
    //
  }

  /**
   * Boot service
   */
  public boot() {
    //
  }

  public on<T = any>(
    name: Keys & string,
    filter: Contract.Filter.Fn<T>,
  ): void {
    this.set(
      `filters.${name}`,
      this.get(`filters.${name}`)
        ? [...this.get(`filters.${name}`), filter]
        : [filter],
    )
  }

  public when<T = any>(
    name: string,
    action: Contract.Action.Fn<T>,
  ): void {
    this.set(
      `actions.${name}`,
      this.get(`actions.${name}`)
        ? [...this.get(`actions.${name}`), action]
        : [action],
    )
  }

  public action<T = any>(name: string, binding: T): void {
    this.has(`actions.${name}`) &&
      this.get(`actions.${name}`).map(action =>
        action.bind(binding),
      )
  }

  public filter<T = any>(name: string, value: T): T {
    return this.has(`filters.${name}`) &&
      this.isArray(`filters.${name}`)
      ? this.get(`filters.${name}`).reduce((v, f) => f(v), value)
      : value
  }
}

declare type Keys =
  | `webpack.${keyof Webpack.Configuration}`
  | string
