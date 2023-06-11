import type {Bud} from '../../../index.js'

/**
 * Base interface for Loaders, Items, and rules
 */
export interface Base {
  app: Bud
  unwrap<T = any>(
    input: ((app: Bud, ...options: Array<any>) => T) | T,
    ...options: Array<any>
  ): T
  wrap<T = any>(input: ((app: Bud) => T) | T): (app: Bud) => T
}
