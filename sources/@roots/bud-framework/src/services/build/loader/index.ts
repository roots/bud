import {Bud} from '../../../bud.js'
import {Base} from '../base.js'

/**
 * Loader interface
 *
 * @remarks
 * Contains the path to the loader source.
 * Loader options are associated with the loader using the {@link @roots/bud-Bud#Item} interface
 *
 * @public
 */
interface Loader extends Base {
  /**
   * Loader source factory
   * @public
   */
  src: string | ((app: Bud) => string)

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

namespace Loader {
  export type Constructor = string | ((app: Bud) => string)
}

export {Loader as default}
