import type {Bud} from '../../../bud'
import type {Base} from './base'
import type {Loaders} from './registry'

/**
 * Loader interface
 *
 * @remarks
 * Contains the path to the loader source.
 * Loader options are associated with the loader using the {@link @roots/bud-Bud#Item} interface
 *
 * @public
 */
export interface Loader extends Base {
  app: Bud

  /**
   * Loader source factory
   * @public
   */
  src: `${keyof Loaders & string}`

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
