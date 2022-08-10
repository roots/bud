import type {Modules} from '../../registry/modules.js'

export const optIn =
  (optIn: Array<`${keyof Modules & string}`>) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      public optIn = new Set(optIn)
    }
