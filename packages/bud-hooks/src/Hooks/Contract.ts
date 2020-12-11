import {Hook} from '../Hook'

export default Hooks

/**
 * Hooks contract
 */
declare interface Hooks {
  has: Hooks.Has
  on: Hooks.On
  action: Hooks.Action
  filter: Hooks.Filter
}

declare namespace Hooks {
  export {Hook}

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
