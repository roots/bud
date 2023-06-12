import type {Bud} from '../../../index.js'
import type {Base} from './base.js'

/**
 * Loader interface
 *
 * @remarks
 * Contains the path to the loader source.
 * Loader options are associated with the loader using the {@link @roots/bud-Bud#Item} interface
 */
export interface Loader extends Base {
  _app: () => Bud
  app: Bud

  /**
   * Get src
   */
  getSrc(): string

  /**
   * Set src
   * @param src - string
   */
  setSrc(src: ((app: Bud) => string) | string): Loader
  /**
   * Loader source factory
   */
  src: string
}

export type Constructor = ((app: Bud) => string) | string
