import Service from './Service'
import type {Framework} from '@roots/bud-typings'

export default class extends Service implements Framework.Hooks {
  public on<T = unknown>(
    name: string,
    filter: Framework.Hooks.Filter.Fn<T>,
  ): void {
    this.filters.set(name, filter)
  }

  public when<T = unknown>(
    name: string,
    action: Framework.Hooks.Action.Fn<T>,
  ): void {
    this.actions.set(name, action)
  }

  public action<T = unknown>(name: string, binding: T): void {
    this.actions.has(name) &&
      this.actions.get(name).map(action => action.bind(binding))
  }

  public filter<T = unknown>(name: string, value: T): T {
    return this.filters.has(name)
      ? this.filters.get(name).reduce(this.reduceFilters, value)
      : value
  }

  public reduceFilters<T>(
    val: T,
    filter: Framework.Hooks.Filter.Fn<T>,
  ): T {
    return filter(val)
  }
}
