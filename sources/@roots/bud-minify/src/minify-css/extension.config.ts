import type {
  BasePluginOptions,
  MinimizerImplementation,
  MinimizerOptions,
} from 'css-minimizer-webpack-plugin'

import {
  Extension,
  type StrictPublicExtensionApi,
} from '@roots/bud-framework/extension'
import {options} from '@roots/bud-framework/extension/decorators'

type BudMinimizeCSSOptions = BasePluginOptions & {
  exclude: BasePluginOptions[`exclude`]
  include: BasePluginOptions[`include`]
  minify: MinimizerImplementation<any>
  minimizerOptions: MinimizerOptions<any>
  parallel: BasePluginOptions[`parallel`]
  test: BasePluginOptions[`test`]
  warningsFilter: BasePluginOptions[`warningsFilter`]
}

interface BudMinimizeCSSPublicInterface
  extends StrictPublicExtensionApi<
    BudMinimizeCSSPublicApi,
    BudMinimizeCSSOptions
  > {}

@options<BudMinimizeCSSOptions>({
  exclude: undefined,
  include: undefined,
  minify: undefined,
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
  parallel: false,
  test: undefined,
  warningsFilter: undefined,
})
class BudMinimizeCSSPublicApi
  extends Extension<BudMinimizeCSSOptions>
  implements BudMinimizeCSSPublicInterface
{
  public declare exclude: BudMinimizeCSSPublicInterface[`exclude`]
  public declare getExclude: BudMinimizeCSSPublicInterface[`getExclude`]
  public declare getInclude: BudMinimizeCSSPublicInterface[`getInclude`]
  public declare getMinify: BudMinimizeCSSPublicInterface[`getMinify`]
  public declare getMinimizerOptions: BudMinimizeCSSPublicInterface[`minimizerOptions`]
  public declare getParallel: BudMinimizeCSSPublicInterface[`getParallel`]
  public declare getTest: BudMinimizeCSSPublicInterface[`getTest`]

  public declare getWarningsFilter: BudMinimizeCSSPublicInterface[`getWarningsFilter`]
  public declare include: BudMinimizeCSSPublicInterface[`include`]

  public declare minify: BudMinimizeCSSPublicInterface[`minify`]
  public declare minimizerOptions: BudMinimizeCSSPublicInterface[`minimizerOptions`]

  public declare parallel: BudMinimizeCSSPublicInterface[`parallel`]
  public declare setExclude: BudMinimizeCSSPublicInterface[`setExclude`]

  public declare setInclude: BudMinimizeCSSPublicInterface[`setInclude`]
  public declare setMinify: BudMinimizeCSSPublicInterface[`setMinify`]

  public declare setMinimizerOptions: BudMinimizeCSSPublicInterface[`setMinimizerOptions`]
  public declare setParallel: BudMinimizeCSSPublicInterface[`setParallel`]

  public declare setTest: BudMinimizeCSSPublicInterface[`setTest`]
  public declare setWarningsFilter: BudMinimizeCSSPublicInterface[`setWarningsFilter`]

  public declare test: BudMinimizeCSSPublicInterface[`test`]
  public declare warningsFilter: BudMinimizeCSSPublicInterface[`warningsFilter`]
}

export {
  type BudMinimizeCSSOptions,
  BudMinimizeCSSPublicApi,
  type BudMinimizeCSSPublicInterface,
}
