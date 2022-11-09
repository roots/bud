import type {Item} from '../services/build/item.js'

interface Items {
  _?: Item
}

type Registry = Items & {
  [K in keyof Items as `${K & string}`]: Items[K]
}

type Constructors = {
  [K in keyof Registry as `${K & string}`]?: new (
    ...args: any[]
  ) => Registry[K]
}

export {Items, Registry, Constructors}
