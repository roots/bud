import type Framework from '@roots/bud-typings'
import {Indexed} from '@roots/container'

export class Hooks extends Indexed implements Framework.Hooks {
  logger: Framework.Hooks.Logger

  public constructor({logger}: Framework.Hooks.Options) {
    super({})
    this.logger = logger
  }

  public on: Framework.Hooks.Register = function (name, hook) {
    this.repository[name] = this.repository[name]
      ? [this.repository[name], hook]
      : [hook]

    return this
  }

  public filter: Framework.Hooks.Filter = function (
    name,
    value,
  ) {
    return !this.repository[name]
      ? value
      : this.repository[name].reduce(...this.waterfall(value))
  }

  public waterfall: Framework.Hooks.Waterfall = data => [
    (_res, hook) => hook(data),
    null,
  ]
}
