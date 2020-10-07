import type Bud from '../../Bud'
import {Extension} from '../Extension'

export {Extensions}

/**
 * Extensions controller
 */
declare class Extensions {
  /**
   * The Bud instance.
   *
   * @type {Bud}
   * @memberof Controller
   */
  bud: Bud

  /**
   * Keyed extensions
   *
   * @type {Framework.Index<Extension.Interface>}
   * @memberof Controller
   */
  extensions: Framework.Index<Extension>

  /**
   * Boot an extension.
   *
   * @param {Framework.Index<Extension.Factory>} definitions
   * @memberof Controller
   */
  boot(definitions: Framework.Index<Extension.Factory>): void

  /**
   * Set the options on a booted extension.
   *
   * @param {string} extension
   * @param {Framework.Index<unknown>} options
   * @memberof Controller
   */
  setOptions?: (
    extension: string,
    options: Framework.Index<unknown>,
  ) => void

  /**
   * Make an extension
   *
   * @note applies only to webpack plugins
   *
   * @returns {Extension.Product[]}
   * @memberof Controller
   */
  make(): Extension.Product[]
}
