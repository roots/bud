import type {Item} from '../services/build/item.js'

interface Items {
  _?: Item
}

type Registry = {
  [K in keyof Items as `${K & string}`]: Items[K]
} & Items

type Constructors = {
  [K in keyof Registry as `${K & string}`]?: new (
    ...args: any[]
  ) => Registry[K]
}

export type {Constructors, Items, Registry}
