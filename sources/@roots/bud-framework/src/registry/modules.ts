import {Constructor} from '../extension/abstract'
import {Module} from '../extension/module'

export interface Modules {
  [key: `extension.${string}`]: Module | Constructor
}

export namespace Modules {
  export type HookMap = Modules
}
