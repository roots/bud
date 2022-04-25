import {Extension} from '../extension'
import {Controller} from '../services/extensions'

export interface Modules {
  [key: string]: Extension
}
export type ModuleMap = Modules & {
  [K in keyof Modules as `${K & string}`]: Modules[K]
}

export type Controllers = {
  [K in keyof Modules as `${K & string}`]?: Controller<K & string>
}

export type Definitions = {
  [K in keyof ModuleMap as `${K & string}`]?: new (
    ...args: any[]
  ) => ModuleMap[K]
}
