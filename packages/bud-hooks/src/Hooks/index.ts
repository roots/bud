import Framework from '@roots/bud-typings'
import {Container} from '@roots/container'

export {Hooks, Hooks as default}

class Hooks extends Container
  implements Framework.Hooks.Contract {
  logger: Framework.Logger.Contract

  public constructor({logger}: Framework.Hooks.Options) {
    super({})

    this.logger = logger
  }

  public on<T = any>(
    name: string,
    hook: Framework.Hooks.Hook<T>,
  ): this {
    this.repository[name] = this.repository[name]
      ? [this.repository[name], hook]
      : [hook]

    return this
  }

  public action<T = unknown>(name: string, binding: T): void {
    this.repository[name].map((hook: Framework.Hooks.Hook<T>) =>
      hook.bind(binding),
    )
  }

  public filter<T = unknown>(name: string, value: T): T {
    return !this.repository[name]
      ? value
      : this.repository[name].reduce(
          (val: T, hook: Framework.Hooks.Hook<T>) => hook(val),
          null,
        )
  }
}
