import type {Bud} from '../../Bud'
import type {Extension} from '../Extension'

export {Extensions}

/**
 * Extensions controller
 */
declare class Extensions {
  /**
   * The Bud instance.
   *
   * @type {Bud}
   */
  bud: Bud

  /**
   * Keyed extensions
   *
   * @type {Framework.Index<Extension.Interface>}
   */
  extensions: Framework.Index<Extension>

  /**
   * Register extension
   */
  register(
    name: string,
    extension: Framework.Extension.Factory,
  ): void

  /**
   * Boot an extension.
   *
   * @param {Framework.Index<Extension.Factory>} definitions
   */
  public boot(
    definitions: Framework.Index<Framework.Extension.Factory>,
  ): void

  /**
   * Get plugin options.
   *
   * @param {string} extension
   */
  getOptions: (
    extension: string,
  ) => any

  /**
   * Set the options on a booted extension.
   *
   * @param {string} extension
   * @param {Framework.Index<unknown>} options
   */
  setOptions: (
    extension: string,
    options: Framework.Index<unknown>,
  ) => void

  /**
   * Make all plugin extensions
   *
   * @note applies only to webpack plugins
   *
   * @returns {Extension.Product[]}
   */
  makePlugins(): Extension.Product[]

  /**
   * Bind all config API methods.
   */
  public bindApi(
    methods: Framework.Index<CallableFunction>,
  ): void
}
