import type {Extension} from '../../extension/index.js'

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

export {Modules, Registry, Constructors}
