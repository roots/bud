import type {Rule} from '../services/build/rule.js'

interface Rules {
  _?: Rule
}

type Registry = Rules & {
  [K in keyof Rules as `${K & string}`]: Rules[K]
}

type Constructors = {
  [K in keyof Registry as `${K & string}`]?: new (
    ...args: any[]
  ) => Registry[K]
}

export {Rules, Registry, Constructors}
