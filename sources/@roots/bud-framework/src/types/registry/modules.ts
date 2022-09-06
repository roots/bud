import type {Extension} from '../../extension'

export type Modules = Record<string, Extension>

export type Registry = Modules & {
  [K in keyof Modules as `${K & string}`]: Modules[K]
}

export type Constructors = {
  [K in keyof Registry as `${K & string}`]?: new (
    ...args: any[]
  ) => Registry[K]
}
