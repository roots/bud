import Service from './Service'
import {Hooks as Contract} from '@roots/bud-typings'

/**
 * Hooks
 */

export class Hooks extends Service implements Contract {
  public on<T = unknown>(
    name: string,
    filter: Contract.Filter.Fn<T>,
  ): void {
    this.filters.set(name, filter)
  }

  public when<T = unknown>(
    name: string,
    action: Contract.Action.Fn<T>,
  ): void {
    this.actions.set(name, action)
  }

  public action<T = unknown>(name: string, binding: T): void {
    this.actions.has(name) &&
      this.actions.get(name).map(action => action.bind(binding))
  }

  public filter<T = unknown>(name: string, value: T): T {
    return this.filters.has(name) && this.filters.isArray(name)
      ? this.filters.get(name).reduce((v, f) => f(v), [])
      : value
  }
}
