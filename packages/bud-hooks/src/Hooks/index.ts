import Service from './Service'
import type {Hooks} from '@roots/bud-typings'

export default class extends Service implements Hooks {
  public has: Hooks.Has = function (name) {
    return Object.keys(this.store).includes(name)
  }

  public on: Hooks.On = function <T>(
    name: string,
    hook: Hooks.Hook<T>,
  ) {
    this.store[name] = this.has(name)
      ? [...this.store[name], hook]
      : [hook]

    return this
  }

  public action: Hooks.Action = function <T>(
    name: string,
    binding: T,
  ) {
    const map: Hooks.Action.Map<T> = hook => hook.bind(binding)

    this.has(name) && this.store[name].map(map)
  }

  public filter: Hooks.Filter = function <T>(
    name: string,
    value: T,
  ) {
    const reducer: Hooks.Filter.Reducer<T> = (val, hook) =>
      hook(val)

    return this.has(name)
      ? this.store[name].reduce(reducer, value)
      : value
  }
}
