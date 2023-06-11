import type {Plugin, Processor} from 'postcss'

import {
  Extension,
  type OptionCallbackValue,
  type StrictPublicExtensionApi,
} from '@roots/bud-framework/extension'
import {options} from '@roots/bud-framework/extension/decorators'

type PluginReference = [Plugin | Processor | string, any?]

type PluginInput = Plugin | PluginReference | Processor | string
type PluginInputList = Array<PluginInput>
type PluginRecords = Record<string, PluginReference>

/**
 * PostCSS configuration options
 */
type Options = {
  config?: boolean
  order: Array<`${keyof PluginRecords & string}`>
  parser?: string
  plugins: PluginRecords
  postcssOptions?: {
    config?: boolean
    parser?: string
    plugins?: Array<PluginReference>
    syntax?: string
  }
  sourceMap?: boolean
  syntax?: string
}

type BudPostCssPublicInterface = StrictPublicExtensionApi<
  BudPostCssOptionsApi,
  Options
> & {
  getPlugin(name: string): PluginReference
  getPluginOptions(name: string): Record<string, any>
  getPluginPath(name: string): string
  setPlugin(name: string, plugin?: PluginInput): BudPostCssPublicInterface
  setPluginOptions(
    name: string,
    options: Record<string, any>,
  ): BudPostCssPublicInterface
  setPluginPath(name: string, path: string): BudPostCssPublicInterface
  unsetPlugin(name: string): BudPostCssPublicInterface
  use(
    plugins: OptionCallbackValue<Options, `order`>,
  ): BudPostCssPublicInterface
}

@options<Options>({
  config: false,
  order: [],
  parser: undefined,
  plugins: {},
  postcssOptions: {},
  sourceMap: false,
  syntax: undefined,
})
class BudPostCssOptionsApi extends Extension<Options> {
  /**
   * PostCss config
   */
  public config: BudPostCssPublicInterface[`config`]
  /**
   * Get postcss config
   */
  public getConfig: BudPostCssPublicInterface[`getConfig`]
  /**
   * Get PostCss plugin order
   */
  public getOrder: BudPostCssPublicInterface[`getOrder`]

  /**
   * Get PostCss parser
   */
  public getParser: BudPostCssPublicInterface[`getParser`]
  /**
   * Get PostCss plugins
   */
  public getPlugins: BudPostCssPublicInterface[`getPlugins`]
  /**
   * get postcssOptions
   */
  public getPostcssOptions: BudPostCssPublicInterface[`getPostcssOptions`]

  /**
   * get sourceMap option
   */
  public getSourceMap: BudPostCssPublicInterface[`getSourceMap`]
  /**
   * Get PostCss syntax
   */
  public getSyntax: BudPostCssPublicInterface[`getSyntax`]
  /**
   * PostCss plugin order
   */
  public order: BudPostCssPublicInterface[`order`]

  /**
   * Parser
   */
  public parser: BudPostCssPublicInterface[`parser`]
  /**
   * PostCss plugins
   */
  public plugins: BudPostCssPublicInterface[`plugins`]
  /**
   * postcssOptions
   */
  public postcssOptions: BudPostCssPublicInterface[`postcssOptions`]

  /**
   * Set postcss config
   */
  public setConfig: BudPostCssPublicInterface[`setConfig`]
  /**
   * Set PostCss plugin order
   */
  public setOrder: BudPostCssPublicInterface[`setOrder`]
  /**
   * Set PostCss parser
   */
  public setParser: BudPostCssPublicInterface[`setParser`]

  /**
   * Set PostCss plugins
   */
  public setPlugins: BudPostCssPublicInterface[`setPlugins`]
  /**
   * set postcssOptions
   */
  public setPostcssOptions: BudPostCssPublicInterface[`setPostcssOptions`]
  /**
   * set sourceMap option
   */
  public setSourceMap: BudPostCssPublicInterface[`setSourceMap`]

  /**
   * Set PostCss syntax
   */
  public setSyntax: BudPostCssPublicInterface[`setSyntax`]
  /**
   * sourceMap option
   */
  public sourceMap: BudPostCssPublicInterface[`sourceMap`]
  /**
   * Syntax
   */
  public syntax: BudPostCssPublicInterface[`syntax`]
}

export {
  BudPostCssOptionsApi,
  type BudPostCssPublicInterface,
  type Options,
  type PluginInput,
  type PluginInputList,
  type PluginRecords,
  type PluginReference,
}
