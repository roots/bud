import type {Bud} from '@roots/bud-framework/bud'

export const expose =
  (propName: `${keyof Bud & string}`) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      public constructor(...args: any[]) {
        super(...args)
        this.app[propName] = this
      }
    }
