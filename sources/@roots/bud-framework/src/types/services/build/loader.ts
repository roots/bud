import type {Bud} from '../../../bud.js'
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
   * Loader source factory
   * @public
   */
  src: string

  /**
   * Set src
   * @param src - string
   * @public
   */
  setSrc(src: string | ((app: Bud) => string)): Loader
  /**
   * Get src
   * @public
   */
  getSrc(): string
}

export type Constructor = string | ((app: Bud) => string)
