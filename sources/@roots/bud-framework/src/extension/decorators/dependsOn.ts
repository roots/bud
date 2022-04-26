import {Modules} from '../../registry'

export const dependsOn =
  (dependsOn: Array<`${keyof Modules & string}`>) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      public dependsOn = new Set(dependsOn)
    }
