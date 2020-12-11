import Service from './Service'
import Contract from './Contract'

export class Hooks extends Service implements Contract {
  public has: Contract.Has = function (name) {
    return Object.keys(this.store).includes(name)
  }

  public on: Contract.On = function <T>(
    name: string,
    hook: Contract.Hook<T>,
  ) {
    this.store[name] = this.has(name)
      ? [...this.store[name], hook]
      : [hook]

    return this
  }

  public action: Contract.Action = function <T = unknown>(
    name: string,
    binding: T,
  ) {
    const map: Contract.Action.Map<T> = hook =>
      hook.bind(binding)

    this.has(name) && this.store[name].map(map)
  }

  public filter: Contract.Filter = function <T = unknown>(
    name: string,
    value: T,
  ) {
    const reducer: Contract.Filter.Reducer<T> = (val, hook) =>
      hook(val)

    return this.has(name)
      ? this.store[name].reduce(reducer, value)
      : value
  }
}
