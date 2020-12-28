import type {Framework} from '@roots/bud-typings'
import {ServiceContainer, set} from '@roots/bud-support'

export default class
  extends ServiceContainer<Framework>
  implements Framework.Hooks.Store {
  public set<T>(key: string, item: T): this {
    set(
      this.repository,
      [`${key}`],
      this.has(key) ? [...this.get(key), item] : [item],
    )

    return this
  }
}
