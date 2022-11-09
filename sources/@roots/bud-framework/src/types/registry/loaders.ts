import type {Loader} from '../services/build/loader.js'

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

export {Loaders, Registry, Constructors}
