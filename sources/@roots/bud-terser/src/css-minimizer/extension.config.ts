import {
  Extension,
  type StrictPublicExtensionApi,
} from '@roots/bud-framework/extension'
import {options} from '@roots/bud-framework/extension/decorators'
import type {
  BasePluginOptions,
  Plugin,
} from '@roots/bud-support/css-minimizer-webpack-plugin'

type Options = BasePluginOptions & {
  warningsFilter: BasePluginOptions['warningsFilter']
  test: BasePluginOptions['test']
  include: BasePluginOptions['include']
  exclude: BasePluginOptions['exclude']
  parallel: BasePluginOptions['parallel']
  minimizerOptions: Plugin.MinimizerOptions<any>
}

interface Api
  extends StrictPublicExtensionApi<BudMinimizeCssConfig, Options> {
  warningsFilter: Options['warningsFilter']
  test: Options['test']
  include: Options['include']
  exclude: Options['exclude']
  parallel: Options['parallel']
  minimizerOptions: Options['minimizerOptions']
}

@options<Options>({
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
class BudMinimizeCssConfig
  extends Extension<Options, Plugin>
  implements Api
{
  public declare warningsFilter: Api['warningsFilter']
  public declare getWarningsFilter: Api['getWarningsFilter']
  public declare setWarningsFilter: Api['setWarningsFilter']

  public declare test: Api['test']
  public declare getTest: Api['getTest']
  public declare setTest: Api['setTest']

  public declare include: Api['include']
  public declare getInclude: Api['getInclude']
  public declare setInclude: Api['setInclude']

  public declare exclude: Api['exclude']
  public declare getExclude: Api['getExclude']
  public declare setExclude: Api['setExclude']

  public declare parallel: Api['parallel']
  public declare getParallel: Api['getParallel']
  public declare setParallel: Api['setParallel']

  public declare minimizerOptions: Api['minimizerOptions']
  public declare getMinimizerOptions: Api['minimizerOptions']
  public declare setMinimizerOptions: Api['setMinimizerOptions']
}

export {BudMinimizeCssConfig, type Api, type Options}
