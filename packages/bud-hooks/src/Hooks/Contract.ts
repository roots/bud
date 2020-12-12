export default Hooks

declare interface Hooks {
  has: Hooks.Has
  on: Hooks.On
  action: Hooks.Action
  filter: Hooks.Filter
}

declare namespace Hooks {
  /**
   * Hook
   *
   * Mutates a runtime value.
   *
   * Receives a value from a filter reducer and does something
   * with it (or based on it). The returned
   * value is either returned to the filter or passed to the next
   * registered hook (if more than one hook has been registered).
   */
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
