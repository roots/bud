import type {Bud} from '../Bud'
import {Webpack} from '../Webpack'

export as namespace Extensions

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
   * @type {Framework.Container}
   */
  extensions: Framework.Container

  /**
   * Register an extension to be utilized during compilation.
   */
  use(name: string): this

  /**
   * Register extension
   */
  register(
    name: string,
    extension: Framework.Extension.Factory,
  ): this

  /**
   * Boot an extension.
   *
   * @param {Framework.Index<Extension.Factory>} definitions
   */
  public boot(
    definitions: Framework.Index<Framework.Extension.Factory>,
  ): void

  /**
   * Get extension.
   */
  get: (key: string) => Framework.Extension

  /**
   * Get plugin options.
   *
   * @param {string} extension
   */
  getOptions: (extension: string) => any

  /**
   * Set the options on a booted extension.
   *
   * @param {string} extension
   */
  setOptions: (extension: string, options: any) => void

  /**
   * Make all plugin extensions
   *
   * @note applies only to webpack plugins
   *
   * @returns {Extension.Product[]}
   */
  makePlugins(): Webpack.Plugin[]

  /**
   * Bind all config API methods.
   */
  public bindApi(
    methods: Framework.Index<CallableFunction>,
  ): void
}
