import {Extension} from '../extension'

export interface Modules {
  [key: string]: Extension<any, any>
}

export type ModuleMap = Modules & {
  [K in keyof Modules as `${K & string}`]: Modules[K]
}

export type Definitions = {
  [K in keyof ModuleMap as `${K & string}`]?: new (
    ...args: any[]
  ) => ModuleMap[K]
}
