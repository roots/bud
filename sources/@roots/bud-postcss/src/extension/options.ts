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
  config: boolean | undefined
  order: Array<`${keyof PluginRecords & string}`> | undefined
  parser: string | undefined
  plugins: PluginRecords | undefined
  postcssOptions:
    | {
        config?: boolean
        parser?: string
        plugins?: Array<PluginReference>
        syntax?: string
      }
    | undefined
  sourceMap: boolean | undefined
  syntax: string | undefined
}

type BudPostCssPublicInterface = StrictPublicExtensionApi<
  BudPostCssOptionsApi,
  Options
> & {
  /**
   * ## {@link Options.config}
   */
  config: Options[`config`]
  /**
   * ## get {@link BudPostCssPublicInterface.config | config}
   */
  getConfig(): BudPostCssPublicInterface[`config`]
  /**
   * ## get {@link BudPostCssPublicInterface.order | plugin order}
   */
  getOrder(): BudPostCssPublicInterface[`order`]
  /**
   * ## get {@link PluginReference | plugin value}
   */
  getPlugin(name: string): PluginReference
  /**
   * ## get {@link PluginReference | plugin options}
   */
  getPluginOptions(name: string): Record<string, any>
  /**
   * ## get {@link PluginReference | plugin path}
   */
  getPluginPath(name: string): string
  /**
   * ## get {@link BudPostCssPublicInterface.plugins | plugin value}
   *
   * @example
   * ```js
   * bud.postcss.hasPlugin('postcss-import')
   * ```
   */
  hasPlugin(name: string): boolean
  /**
   * ## {@link Options.order}
   *
   * Order of PostCss plugins
   */
  order: Options[`order`]
  /**
   *  ## set {@link BudPostCssPublicInterface.config | config}
   *
   * @example
   * ```js
   * bud.postcss.setConfig(true)
   * ```
   */
  setConfig(
    config: BudPostCssPublicInterface[`config`],
  ): BudPostCssPublicInterface
  /**
   * ## set {@link BudPostCssPublicInterface.order | plugin order}
   *
   * @example
   * ```js
   * bud.postcss.setOrder([
   *   'postcss-import',
   *   'postcss-nested',
   *   'postcss-preset-env',
   *   'cssnano',
   * ])
   */
  setOrder(order: Options[`order`]): BudPostCssPublicInterface
  /**
   * ## set {@link PluginReference | plugin value}
   *
   * @example
   * ```js
   * bud.postcss.setPlugin(
   *  'postcss-import',
   *  await bud.module.resolve('postcss-import')
   * )
   * ```
   */
  setPlugin(name: string, plugin?: PluginInput): BudPostCssPublicInterface
  /**
   * ## set {@link PluginReference | plugin options}
   *
   * @example
   * ```js
   * bud.postcss.setPluginOptions('postcss-import', {
   *  path: bud.path('resources/css'),
   * })
   * ```
   */
  setPluginOptions(
    name: string,
    options: Record<string, any>,
  ): BudPostCssPublicInterface
  /**
   * ## set {@link PluginReference | plugin path}
   *
   * @example
   * ```js
   * bud.postcss.setPluginPath('postcss-import', bud.path('resources/css'))
   * ```
   */
  setPluginPath(name: string, path: string): BudPostCssPublicInterface
  /**
   * ## unset {@link PluginReference | plugin}
   *
   * Unregister a plugin by its registered name.
   *
   * @example
   * ```js
   * bud.postcss.unsetPlugin('postcss-import')
   * ```
   */
  unsetPlugin(name: string): BudPostCssPublicInterface
  /**
   * ## set {@link BudPostCssPublicInterface.oder | plugin order}
   */
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
  public declare config: BudPostCssPublicInterface[`config`]
  public declare getConfig: BudPostCssPublicInterface[`getConfig`]
  public declare setConfig: BudPostCssPublicInterface[`setConfig`]

  public declare order: BudPostCssPublicInterface[`order`]
  public declare getOrder: BudPostCssPublicInterface[`getOrder`]
  public declare setOrder: BudPostCssPublicInterface[`setOrder`]

  public declare parser: BudPostCssPublicInterface[`parser`]
  public declare getParser: BudPostCssPublicInterface[`getParser`]
  public declare setParser: BudPostCssPublicInterface[`setParser`]

  public declare plugins: BudPostCssPublicInterface[`plugins`]
  public declare getPlugins: BudPostCssPublicInterface[`getPlugins`]
  public declare setPlugins: BudPostCssPublicInterface[`setPlugins`]

  public declare postcssOptions: BudPostCssPublicInterface[`postcssOptions`]
  public declare getPostcssOptions: BudPostCssPublicInterface[`getPostcssOptions`]
  public declare setPostcssOptions: BudPostCssPublicInterface[`setPostcssOptions`]

  public declare sourceMap: BudPostCssPublicInterface[`sourceMap`]
  public declare getSourceMap: BudPostCssPublicInterface[`getSourceMap`]
  public declare setSourceMap: BudPostCssPublicInterface[`setSourceMap`]

  public declare syntax: BudPostCssPublicInterface[`syntax`]
  public declare getSyntax: BudPostCssPublicInterface[`getSyntax`]
  public declare setSyntax: BudPostCssPublicInterface[`setSyntax`]
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
