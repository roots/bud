import {
  Extension,
  type StrictPublicExtensionApi,
} from '@roots/bud-framework/extension'
import {options} from '@roots/bud-framework/extension/decorators'
import type {
  BasePluginOptions,
  MinimizerImplementation,
  MinimizerOptions,
} from 'css-minimizer-webpack-plugin'

type BudMinimizeCSSOptions = BasePluginOptions & {
  minify: MinimizerImplementation<any>
  warningsFilter: BasePluginOptions[`warningsFilter`]
  test: BasePluginOptions[`test`]
  include: BasePluginOptions[`include`]
  exclude: BasePluginOptions[`exclude`]
  parallel: BasePluginOptions[`parallel`]
  minimizerOptions: MinimizerOptions<any>
}

interface BudMinimizeCSSPublicInterface
  extends StrictPublicExtensionApi<
    BudMinimizeCSSPublicApi,
    BudMinimizeCSSOptions
  > {}

@options<BudMinimizeCSSOptions>({
  minify: undefined,
  warningsFilter: undefined,
  test: undefined,
  include: undefined,
  exclude: undefined,
  parallel: false,
  minimizerOptions: {
    preset: [
      `default`,
      {
        discardComments: {
          removeAll: true,
        },
      },
    ],
  },
})
class BudMinimizeCSSPublicApi
  extends Extension<BudMinimizeCSSOptions>
  implements BudMinimizeCSSPublicInterface
{
  public declare exclude: BudMinimizeCSSPublicInterface[`exclude`]
  public declare include: BudMinimizeCSSPublicInterface[`include`]
  public declare minify: BudMinimizeCSSPublicInterface[`minify`]
  public declare minimizerOptions: BudMinimizeCSSPublicInterface[`minimizerOptions`]
  public declare parallel: BudMinimizeCSSPublicInterface[`parallel`]
  public declare test: BudMinimizeCSSPublicInterface[`test`]
  public declare warningsFilter: BudMinimizeCSSPublicInterface[`warningsFilter`]

  public declare getExclude: BudMinimizeCSSPublicInterface[`getExclude`]
  public declare setExclude: BudMinimizeCSSPublicInterface[`setExclude`]

  public declare getInclude: BudMinimizeCSSPublicInterface[`getInclude`]
  public declare setInclude: BudMinimizeCSSPublicInterface[`setInclude`]

  public declare getMinify: BudMinimizeCSSPublicInterface[`getMinify`]
  public declare setMinify: BudMinimizeCSSPublicInterface[`setMinify`]

  public declare getMinimizerOptions: BudMinimizeCSSPublicInterface[`minimizerOptions`]
  public declare setMinimizerOptions: BudMinimizeCSSPublicInterface[`setMinimizerOptions`]

  public declare getParallel: BudMinimizeCSSPublicInterface[`getParallel`]
  public declare setParallel: BudMinimizeCSSPublicInterface[`setParallel`]

  public declare getTest: BudMinimizeCSSPublicInterface[`getTest`]
  public declare setTest: BudMinimizeCSSPublicInterface[`setTest`]

  public declare getWarningsFilter: BudMinimizeCSSPublicInterface[`getWarningsFilter`]
  public declare setWarningsFilter: BudMinimizeCSSPublicInterface[`setWarningsFilter`]
}

export {
  BudMinimizeCSSPublicApi,
  type BudMinimizeCSSPublicInterface,
  type BudMinimizeCSSOptions,
}
