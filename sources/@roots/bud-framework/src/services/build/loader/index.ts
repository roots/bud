import {Bud} from '../../..'

/**
 * Loader interface
 *
 * @remarks
 * Contains the path to the loader source.
 * Loader options are associated with the loader using the {@link @roots/bud-Bud#Item} interface
 *
 * @public
 */
export interface Loader {
  /**
   * Application instance
   * @public
   */
  app: Bud

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

export namespace Loader {
  export type Constructor = string | ((app: Bud) => string)
}
