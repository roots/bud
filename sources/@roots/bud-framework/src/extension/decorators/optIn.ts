import type {Modules} from '../../types/registry/modules'

export const optIn =
  (optIn: Array<`${keyof Modules & string}`>) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      public optIn = new Set(optIn)
    }
