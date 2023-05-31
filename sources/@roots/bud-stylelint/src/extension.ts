import {
  Extension,
  type OptionCallbackValue,
} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import {deprecated} from '@roots/bud-support/decorators'
import Value from '@roots/bud-support/value'
import Plugin from 'stylelint-webpack-plugin'

export type Options = Plugin.Options & {
  config?: Plugin.Options & {
    plugins?: Plugin.Options[`config`][`plugins`] & Array<unknown>
  }
}

/**
 * Bud stylelint extension
 */
@label(`@roots/bud-stylelint`)
@expose(`stylelint`)
@plugin(Plugin)
@options<Options>({
  /** {@link Options.cache} */
  cache: Value.make(({context, env}) => !context.ci && !env.isTrue(`CI`)),

  /** {@link Options.cacheLocation} */
  cacheLocation: Value.make(({cache, path}) =>
    path(cache.cacheDirectory, `stylelint`),
  ),

  /** {@link Options.config} */
  config: Value.make(
    ({context}) =>
      Object.values(context.files ?? {}).find(({name}) =>
        name.includes(`stylelint`),
      )?.module ?? undefined,
  ),

  /** {@link Options.context} */
  context: Value.make(({path}) => path(`@src`)),

  /** {@link Options.failOnError} */
  failOnError: Value.make(({isProduction}) => isProduction),

  /** {@link Options.failOnWarning} */
  failOnWarning: false,

  /** {@link Options.failOnError} */
  fix: false,

  /** {@link Options.stylelintPath} */
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
  /**
   * Set stylelint config rules
   */
  @bind
  public setRules(
    rules:
      | Options[`config`][`rules`]
      | ((
          rules: Options[`config`][`rules`],
        ) => Options[`config`][`rules`]),
  ) {
    this.setConfig((config = {}) => {
      return typeof rules === `function`
        ? {...config, rules: rules(config.rules)}
        : {...config, rules: {...config.rules, ...rules}}
    })
    return this
  }

  /**
   * Set stylelint config plugins
   */
  @bind
  public setPlugins(
    plugins:
      | Options[`config`][`plugins`]
      | ((
          plugins: Options[`config`][`plugins`],
        ) => Options[`config`][`plugins`]),
  ) {
    this.setConfig((config = {}) => {
      const normalizedPlugins = Array.isArray(plugins)
        ? plugins
        : [plugins]
      if (!Array.isArray(config.plugins)) config.plugins = [config.plugins]

      return typeof plugins === `function`
        ? {...config, plugins: plugins(config.plugins)}
        : {...config, plugins: [...config.plugins, ...normalizedPlugins]}
    })
    return this
  }

  @bind
  public setFiles(
    files:
      | Options[`config`][`files`]
      | ((
          files: Options[`config`][`files`],
        ) => Options[`config`][`files`]),
  ) {
    this.setConfig((config = {}) => {
      return typeof files === `function`
        ? {...config, files: files(config.files)}
        : {...config, files: [...config.files, ...files]}
    })
    return this
  }

  /**
   * Extend config
   *
   * @example
   * ```js
   * bud.eslint.extends(['@roots/eslint-config'])
   * ```
   *
   * @example
   * ```js
   * bud.eslint.extends(configs => [...configs, '@roots/eslint-config'])
   * ```
   */
  @bind
  public extends(
    config:
      | Options[`config`][`extends`]
      | ((
          configs: Options[`config`][`extends`],
        ) => Options[`config`][`extends`]),
  ) {
    this.setConfig((current = {}) => {
      return typeof config === `function`
        ? {...current, extends: config(current.extends)}
        : {...current, extends: [...(current?.extends ?? []), ...config]}
    })
    return this
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
