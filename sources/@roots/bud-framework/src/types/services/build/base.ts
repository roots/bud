import type {Bud} from '../../../bud.js'

/**
 * Base interface for Loaders, Items, and rules
 */
export interface Base {
  app: Bud
  wrap<T = any>(input: T | ((app: Bud) => T)): (app: Bud) => T
  unwrap<T = any>(
    input: T | ((app: Bud, ...options: Array<any>) => T),
    ...options: Array<any>
  ): T
}
