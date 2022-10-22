import type {Extension} from '../index.js'

export const when =
  (when: Extension['when']) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      public when: Extension[`when`]

      public constructor(...args: any[]) {
        super(...args)
        this.when = when.bind ? when.bind(this) : when
      }
    }
