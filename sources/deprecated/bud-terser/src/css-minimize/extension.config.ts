import {
  Extension,
  type StrictPublicExtensionApi,
} from '@roots/bud-framework/extension'
import {options} from '@roots/bud-framework/extension/decorators'
import type {
  BasePluginOptions,
  Plugin,
} from '@roots/bud-support/css-minimizer-webpack-plugin'

type BudMinimizeCSSOptions = BasePluginOptions & {
  warningsFilter: BasePluginOptions['warningsFilter']
  test: BasePluginOptions['test']
  include: BasePluginOptions['include']
  exclude: BasePluginOptions['exclude']
  parallel: BasePluginOptions['parallel']
  minimizerOptions: Plugin.MinimizerOptions<any>
}

interface BudMinimizeCSSPublicInterface
  extends StrictPublicExtensionApi<
    BudMinimizeCSSPublicApi,
    BudMinimizeCSSOptions
  > {
  warningsFilter: BudMinimizeCSSOptions['warningsFilter']
  test: BudMinimizeCSSOptions['test']
  include: BudMinimizeCSSOptions['include']
  exclude: BudMinimizeCSSOptions['exclude']
  parallel: BudMinimizeCSSOptions['parallel']
  minimizerOptions: BudMinimizeCSSOptions['minimizerOptions']
}

@options<BudMinimizeCSSOptions>({
  warningsFilter: undefined,
  test: undefined,
  include: undefined,
  exclude: undefined,
  parallel: true,
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
  extends Extension<BudMinimizeCSSOptions, Plugin>
  implements BudMinimizeCSSPublicInterface
{
  public declare warningsFilter: BudMinimizeCSSPublicInterface['warningsFilter']
  public declare getWarningsFilter: BudMinimizeCSSPublicInterface['getWarningsFilter']
  public declare setWarningsFilter: BudMinimizeCSSPublicInterface['setWarningsFilter']

  public declare test: BudMinimizeCSSPublicInterface['test']
  public declare getTest: BudMinimizeCSSPublicInterface['getTest']
  public declare setTest: BudMinimizeCSSPublicInterface['setTest']

  public declare include: BudMinimizeCSSPublicInterface['include']
  public declare getInclude: BudMinimizeCSSPublicInterface['getInclude']
  public declare setInclude: BudMinimizeCSSPublicInterface['setInclude']

  public declare exclude: BudMinimizeCSSPublicInterface['exclude']
  public declare getExclude: BudMinimizeCSSPublicInterface['getExclude']
  public declare setExclude: BudMinimizeCSSPublicInterface['setExclude']

  public declare parallel: BudMinimizeCSSPublicInterface['parallel']
  public declare getParallel: BudMinimizeCSSPublicInterface['getParallel']
  public declare setParallel: BudMinimizeCSSPublicInterface['setParallel']

  public declare minimizerOptions: BudMinimizeCSSPublicInterface['minimizerOptions']
  public declare getMinimizerOptions: BudMinimizeCSSPublicInterface['minimizerOptions']
  public declare setMinimizerOptions: BudMinimizeCSSPublicInterface['setMinimizerOptions']
}

export {
  BudMinimizeCSSPublicApi,
  type BudMinimizeCSSPublicInterface,
  type BudMinimizeCSSOptions,
}
