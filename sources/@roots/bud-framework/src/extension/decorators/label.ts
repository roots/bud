import type {Modules} from '../../types/registry/modules'

/**
 * A decorator that adds a `label` property to the class.
 *
 * @param label - Extension label
 */
export const label =
  (label: `${keyof Modules & string}`) =>
  <Type extends {new (...args: any[]): any}>(constructor: Type) =>
    class extends constructor {
      public label = label
    }
