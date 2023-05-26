import type {Bud} from '@roots/bud-framework'
import {
  Extension,
  type OptionsCallback,
  type WithOptions,
} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
  options,
  production,
} from '@roots/bud-framework/extension/decorators'
import type {
  BasePluginOptions,
  Plugin,
} from '@roots/bud-support/css-minimizer-webpack-plugin'

export interface Options extends BasePluginOptions {
  minimizerOptions: any
}

/**
 * Terser css minimizer configuration
 */
@label(`@roots/bud-terser/css-minimizer`)
@expose(`minimizeCss`)
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
@production
export class BudMinimizeCss
  extends Extension<Options, Plugin>
  implements WithOptions<BudMinimizeCss, Options>
{
  public declare warningsFilter: Options['warningsFilter']
  public declare getWarningsFilter: () => Options['warningsFilter']
  public declare setWarningsFilter: (
    filter: OptionsCallback<Options, 'warningsFilter'>,
  ) => BudMinimizeCss

  public declare test: Options['test']
  public declare getTest: () => Options['test']
  public declare setTest: (
    test: OptionsCallback<Options, 'test'>,
  ) => BudMinimizeCss

  public declare include: Options['include']
  public declare getInclude: () => Options['include']
  public declare setInclude: (
    include: OptionsCallback<Options, 'include'>,
  ) => BudMinimizeCss

  public declare exclude: Options['exclude']
  public declare getExclude: () => Options['exclude']
  public declare setExclude: (
    exclude: OptionsCallback<Options, 'exclude'>,
  ) => BudMinimizeCss

  public declare parallel: Options['parallel']
  public declare getParallel: () => Options['parallel']
  public declare setParallel: (
    parallel: OptionsCallback<Options, 'parallel'>,
  ) => BudMinimizeCss

  public declare minimizerOptions: Options['minimizerOptions']
  public declare getMinimizerOptions: () => Options['minimizerOptions']
  public declare setMinimizerOptions: (
    minimizerOptions: OptionsCallback<Options, 'minimizerOptions'>,
  ) => BudMinimizeCss

  /**
   * {@link Extension.buildBefore}
   */
  @bind
  public override async buildBefore({hooks}: Bud) {
    const {Plugin} = await import(
      `@roots/bud-support/css-minimizer-webpack-plugin`
    )

    hooks.on(`build.optimization.minimizer`, (minimizer = []) => {
      minimizer.push(new Plugin(this.options))
      this.logger.success(`css-minimizer added to minimizers`)
      return minimizer
    })
  }
}
