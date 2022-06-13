import type {Bud} from '../../bud.js'

export const expose =
  (propName: `${keyof Bud & string}`) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      public constructor(...args: any[]) {
        super(...args)
        this.app[propName] = this
      }
    }
