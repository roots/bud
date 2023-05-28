import type {Bud} from '@roots/bud-framework'
import {
  Extension,
  type OptionCallbackValue,
} from '@roots/bud-framework/extension'
import {
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import Value from '@roots/bud-framework/value'
import {deprecated} from '@roots/bud-support/decorators'
import Plugin from 'stylelint-webpack-plugin'

export interface Options extends Plugin.Options {}

/**
 * Bud stylelint extension
 */
@label(`@roots/bud-stylelint`)
@expose(`stylelint`)
@plugin(Plugin)
@options<Options>({
  cache: new Value(({context, env}) => !context.ci && !env.isTrue(`CI`)),
  cacheLocation: new Value(({cache, path}) =>
    path(cache.cacheDirectory, `stylelint`),
  ),
  config: undefined,
  context: new Value(({path}) => path(`@src`)),
  failOnWarning: false,
  failOnError: new Value(({isProduction}) => isProduction),
  fix: false,
  stylelintPath: undefined,
})
export default class BudStylelintWebpackPlugin extends Extension<
  Options,
  Plugin
> {
  public declare cache: Options['cache']
  public declare getCache: () => Options['cache']
  public declare setCache: (
    cache: OptionCallbackValue<Options, `cache`>,
  ) => this

  public declare config: Options['config']
  public declare setConfig: (
    config: OptionCallbackValue<Options, `config`>,
  ) => this
  public declare getConfig: () => Options['config']

  public declare context: string
  public declare getContext: () => string
  public declare setContext: (
    context: OptionCallbackValue<Options, `context`>,
  ) => this

  public declare cacheLocation: Options['cacheLocation']
  public declare getCacheLocation: () => Options[`cacheLocation`]
  public declare setCacheLocation: (
    location: OptionCallbackValue<Options, `cacheLocation`>,
  ) => this

  public declare fix: Options['fix']
  public declare getFix: () => Options[`fix`]
  public declare setFix: (fix: OptionCallbackValue<Options, `fix`>) => this

  public declare stylelintPath: Options['stylelintPath']
  public declare getStylelintPath: () => Options[`stylelintPath`]
  public declare setStylelintPath: (
    path: OptionCallbackValue<Options, `stylelintPath`>,
  ) => this

  public override async register({context}: Bud) {
    const config = Object.values(context.files ?? {}).find(({name}) =>
      name.includes(`stylelint`),
    )?.module

    config && this.setConfig(config)
  }

  /**
   * Fail build on stylelint error
   *
   * @deprecated Use {@link Extension.set} instead
   *
   * @example
   * ```js
   * bud.stylelint.set(`failOnError`, true)
   * ```
   */
  @deprecated(`bud.stylelint`, `use bud.stylelint.set instead`, [
    [`Fail on error`, `bud.stylelint.set(\`failOnError\`, true)`],
  ])
  public failOnError(fail: boolean = true): this {
    this.set(`failOnError`, fail)
    return this
  }

  /**
   * Fail build on stylelint warning
   *
   * @deprecated Use {@link Extension.set} instead
   *
   * @example
   * ```js
   * bud.stylelint.set(`failOnWarning`, true)
   * ```
   */
  @deprecated(`bud.stylelint`, `use bud.stylelint.set instead`, [
    [`Fail on warning`, `bud.stylelint.set(\`failOnWarning\`, true)`],
  ])
  public failOnWarning(fail: boolean = true): this {
    this.set(`failOnWarning`, fail)
    return this
  }
}
