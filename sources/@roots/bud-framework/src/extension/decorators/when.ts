import type {Extension} from '../index.js'

export const when =
  (when: Extension['when']) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      public when = when
    }
