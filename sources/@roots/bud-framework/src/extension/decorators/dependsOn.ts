import type {Modules} from '../../types/registry/modules.js'

export const dependsOn =
  (dependsOn: Array<`${keyof Modules & string}`>) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      public dependsOn = new Set(dependsOn)
    }
