import type {Bud} from '../../../bud'

/**
 * Base interface for Loaders, Items, and rules
 *
 * @public
 */
export interface Base {
  app: Bud
  wrap<T = any>(input: T | ((app: Bud) => T)): (app: Bud) => T
  unwrap<T = any>(
    input: T | ((app: Bud, ...options: Array<any>) => T),
    ...options: Array<any>
  ): T
}
