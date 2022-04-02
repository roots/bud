import {Framework} from '../../Framework'

/**
 * Defines a webpack loader
 *
 * @public
 */
export interface Loader {
  /**
   * Application instance
   */
  app: Framework

  /**
   * Loader src factory
   *
   * @public
   */
  src: string | ((app: Framework) => string)

  /**
   * Set src
   *
   * @param src - string
   */
  setSrc(src: string | ((app: Framework) => string)): Loader
  getSrc(): string
}

export namespace Loader {
  export type Constructor = string | ((app: Framework) => string)
}
