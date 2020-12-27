import {Framework} from './'

/**
 * ## bud.hooks
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud/packages/server](https://git.io/JkCQG)
 * [📦 @roots/bud-server](https://www.npmjs.com/package/@roots/bud-build)
 * [🔗 Documentation](#)
 */
export interface Hooks extends Framework.Service<Framework> {
  has: Hooks.Has
  on: Hooks.On
  action: Hooks.Action
  filter: Hooks.Filter
}

export namespace Hooks {
  export type Hook<T = unknown> = (data: T) => T

  export type Filter = <T = unknown>(name: string, value: T) => T

  export namespace Filter {
    export type Reducer<T> = (val: T, hook: Hook<T>) => T
  }

  export type Action = <T = unknown>(
    name: string,
    binding: T,
  ) => void

  export namespace Action {
    export type Map<T> = (hook: Hook<T>) => Hook<T>
  }

  export type Store = {[key: string]: Hook[]}

  export type Has = (name: string) => boolean

  export type On = <T = unknown>(
    name: string,
    hook: Hook<T>,
  ) => Hooks
}
