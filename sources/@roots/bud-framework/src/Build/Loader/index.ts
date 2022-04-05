import {Framework} from '../../Framework'

/**
 * Loader interface
 * 
 * @remarks
 * Contains the path to the loader source.
 * Loader options are associated with the loader using the {@link @roots/bud-framework#Item} interface
 *
 * @public
 */
export interface Loader {
  /**
   * Application instance
   * @public
   */
  app: Framework

  /**
   * Loader source factory
   * @public
   */
  src: string | ((app: Framework) => string)

  /**
   * Set src
   * @param src - string
   * @public
   */
  setSrc(src: string | ((app: Framework) => string)): Loader
  /**
   * Get src
   * @public
   */
  getSrc(): string
}

export namespace Loader {
  export type Constructor = string | ((app: Framework) => string)
}
