import type {BudExtension} from '@roots/bud-framework/extension/types'

interface Modules extends Record<string, BudExtension> {
  _?: any
}

type Registry = {
  [K in keyof Modules as `${K & string}`]: Modules[K]
} & Modules

type Constructors = {
  [K in keyof Registry as `${K & string}`]?: new (
    ...args: any[]
  ) => Registry[K]
}

export type {Constructors, Modules, Registry}
