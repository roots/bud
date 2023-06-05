import {
  Extension,
  type OptionCallbackValue,
  type StrictPublicExtensionApi,
} from '@roots/bud-framework/extension'
import {options} from '@roots/bud-framework/extension/decorators'
import type {Plugin, Processor} from 'postcss'

type PluginReference = [string | Plugin | Processor, any?]

type PluginInput = string | Plugin | Processor | PluginReference
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
    syntax?: string
    parser?: string
    plugins?: Array<PluginReference>
  }
  sourceMap?: boolean
  syntax?: string
}

type BudPostCssPublicInterface = StrictPublicExtensionApi<
  BudPostCssOptionsApi,
  Options
> & {
  getPlugin(name: string): PluginReference
  setPlugin(name: string, plugin?: PluginInput): BudPostCssPublicInterface
  getPluginPath(name: string): string
  setPluginPath(name: string, path: string): BudPostCssPublicInterface
  unsetPlugin(name: string): BudPostCssPublicInterface
  getPluginOptions(name: string): Record<string, any>
  setPluginOptions(
    name: string,
    options: Record<string, any>,
  ): BudPostCssPublicInterface
  use(
    plugins: OptionCallbackValue<Options, `order`>,
  ): BudPostCssPublicInterface
}

@options<Options>({
  postcssOptions: undefined,
  sourceMap: false,
  plugins: {},
  order: [],
  config: false,
  syntax: undefined,
  parser: undefined,
})
class BudPostCssOptionsApi extends Extension<Options> {
  /**
   * postcssOptions
   */
  public declare postcssOptions: BudPostCssPublicInterface[`postcssOptions`]
  /**
   * get postcssOptions
   */
  public declare getPostcssOptions: BudPostCssPublicInterface[`getPostcssOptions`]
  /**
   * set postcssOptions
   */
  public declare setPostcssOptions: BudPostCssPublicInterface[`setPostcssOptions`]

  /**
   * sourceMap option
   */
  public declare sourceMap: BudPostCssPublicInterface[`sourceMap`]
  /**
   * get sourceMap option
   */
  public declare getSourceMap: BudPostCssPublicInterface[`getSourceMap`]
  /**
   * set sourceMap option
   */
  public declare setSourceMap: BudPostCssPublicInterface[`setSourceMap`]

  /**
   * PostCss plugins
   */
  public declare plugins: BudPostCssPublicInterface[`plugins`]
  /**
   * Get PostCss plugins
   */
  public declare getPlugins: BudPostCssPublicInterface[`getPlugins`]
  /**
   * Set PostCss plugins
   */
  public declare setPlugins: BudPostCssPublicInterface[`setPlugins`]

  /**
   * PostCss plugin order
   */
  public declare order: BudPostCssPublicInterface[`order`]
  /**
   * Get PostCss plugin order
   */
  public declare getOrder: BudPostCssPublicInterface[`getOrder`]
  /**
   * Set PostCss plugin order
   */
  public declare setOrder: BudPostCssPublicInterface[`setOrder`]

  /**
   * PostCss config
   */
  public declare config: BudPostCssPublicInterface[`config`]
  /**
   * Get postcss config
   */
  public declare getConfig: BudPostCssPublicInterface[`getConfig`]
  /**
   * Set postcss config
   */
  public declare setConfig: BudPostCssPublicInterface[`setConfig`]

  /**
   * Syntax
   */
  public declare syntax: BudPostCssPublicInterface[`syntax`]
  /**
   * Get PostCss syntax
   */
  public declare getSyntax: BudPostCssPublicInterface[`getSyntax`]
  /**
   * Set PostCss syntax
   */
  public declare setSyntax: BudPostCssPublicInterface[`setSyntax`]

  /**
   * Parser
   */
  public declare parser: BudPostCssPublicInterface[`parser`]
  /**
   * Get PostCss parser
   */
  public declare getParser: BudPostCssPublicInterface[`getParser`]
  /**
   * Set PostCss parser
   */
  public declare setParser: BudPostCssPublicInterface[`setParser`]
}

export {
  BudPostCssOptionsApi,
  type BudPostCssPublicInterface,
  type Options,
  type PluginInput,
  type PluginInputList,
  type PluginReference,
  type PluginRecords,
}
