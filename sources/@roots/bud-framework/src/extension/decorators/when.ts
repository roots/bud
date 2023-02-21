import type {Extension} from '../index.js'

export const when =
  (when: Extension['when']) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      public constructor(...args: any[]) {
        super(...args)
        this.when = `bind` in when ? when.bind(this) : when
      }
    }
