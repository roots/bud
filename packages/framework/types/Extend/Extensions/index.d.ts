import Bud from '../../Bud'
/**
 * Boots and handles extension lifecycle concerns.
 */
export declare class Extensions {
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
   * @type {Index<Extension>}
   * @memberof Controller
   */
  extensions: Framework.Index<Framework.Extension>
  /**
   * Creates an instance of Controller.
   *
   * @param {Bud} bud
   * @memberof Controller
   */
  constructor(bud: Bud)
  /**
   * Boot an extension.
   *
   * @param {Index<Extension.Factory>} definitions
   * @memberof Controller
   */
  boot(
    definitions: Framework.Index<Framework.Extension.Factory>,
  ): void
  /**
   * Set the options on a booted extensions.
   *
   * @param {string} extension
   * @param {Index<unknown>} options
   * @memberof Controller
   */
  setOptions(
    extension: string,
    options: Framework.Index<unknown>,
  ): void
  /**
   * Make an extension
   *
   * @note applies only to webpack plugins
   *
   * @returns {Extension.Product[]}
   * @memberof Controller
   */
  make(): Framework.Extension.Product[]
}
//# sourceMappingURL=index.d.ts.map
