import type {Modules} from '../../types/registry/modules'

export const dependsOnOptional =
  (dependsOnOptional: Array<`${keyof Modules & string}`>) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      public dependsOnOptional = new Set(dependsOnOptional)
    }
