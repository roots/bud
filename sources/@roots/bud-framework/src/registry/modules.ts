import type {Extension} from '@roots/bud-framework/extension'

interface Modules {
  _?: Extension
}

type Registry = Modules & {
  [K in keyof Modules as `${K & string}`]: Modules[K]
}

type Constructors = {
  [K in keyof Registry as `${K & string}`]?: new (
    ...args: any[]
  ) => Registry[K]
}

export type {Constructors, Modules, Registry}
