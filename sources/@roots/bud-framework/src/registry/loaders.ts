import type {Loader} from '@roots/bud-framework/build/loader'

interface Loaders {
  _?: Loader
}

type Registry = Loaders & {
  [K in keyof Loaders as `${K & string}`]: Loaders[K]
}

type Constructors = {
  [K in keyof Registry as `${K & string}`]?: new (
    ...args: any[]
  ) => Registry[K]
}

export type {Constructors, Loaders, Registry}
