import pino from 'pino'
import Bud from '../Bud'

export declare interface Hooks {
  logger: Hooks.Logger

  registered: Hooks.Registry

  make: Hooks.RegistryFactory

  entries: () => any

  on: Hooks.Handler

  filter: Hooks.Handler
}

export declare namespace Hooks {
  export type Logger = pino.BaseLogger

  export interface Constructor {
    (app: Bud): Hooks
  }

  export interface Handler {
    (name: string, value: unknown): unknown
  }

  export interface Registry {
    [key: string]: RegistryItem
  }

  export interface RegistryItem {
    hook: Handler
    fired: boolean
  }

  export type RegistryFactory = (hook: Handler) => RegistryItem
}
