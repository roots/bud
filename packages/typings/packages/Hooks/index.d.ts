import type {Bud} from '../Bud'

export declare interface Hooks {
  logger: Bud['logger']

  registered: Hooks.Registry

  make: Hooks.RegistryFactory

  entries: () => any

  on: Hooks.On<any>

  filter: Hooks.Filter<any>
}

export declare namespace Hooks {
  export type Handler<T> = (value: T) => T

  export type On<T> = (name: string, handler: Handler<T>) => T

  export type Filter<T> = (name: string, data: T) => T

  export interface Registry {
    [key: string]: RegistryItem
  }

  export interface RegistryItem {
    hook: Handler<any>
    fired: boolean
  }

  export type RegistryFactory = (
    hook: Handler<any>,
  ) => RegistryItem
}
