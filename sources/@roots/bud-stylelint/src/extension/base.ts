import {
  DynamicOption,
  Extension,
  type StrictPublicExtensionApi as PublicExtensionApi,
} from '@roots/bud-framework/extension'
import {bind, options} from '@roots/bud-framework/extension/decorators'
import Plugin from 'stylelint-webpack-plugin'

export type Options = Plugin.Options &
  Record<string, unknown> & {
    cache: Plugin.Options[`cache`]
    cacheLocation: Plugin.Options[`cacheLocation`]
    config: Plugin.Options[`config`]
    context: Plugin.Options[`context`]
    extensions: Plugin.Options[`extensions`]
    failOnError: Plugin.Options[`failOnError`]
    failOnWarning: Plugin.Options[`failOnWarning`]
    files: Plugin.Options[`files`]
    fix: Plugin.Options[`fix`]
    formatter: Plugin.Options[`formatter`]
    lintDirtyModulesOnly: Plugin.Options[`lintDirtyModulesOnly`]
    stylelintPath: Plugin.Options[`stylelintPath`]
    threads: Plugin.Options[`threads`]
  }

export type Api = PublicExtensionApi<BudStylelintPublicApi, Options> & {
  extends(
    config:
      | ((configs: Api[`config`][`extends`]) => Api[`config`][`extends`])
      | Api[`config`][`extends`],
  ): Api
  getPlugins(): Api[`config`][`plugins`]
  getRules(): Api[`config`][`rules`]
  plugins: Options[`config`][`plugins`]
  rules: Options[`config`][`rules`]
  setPlugins(
    plugins:
      | ((
          plugins: Options[`config`][`plugins`],
        ) => Options[`config`][`plugins`])
      | Options[`config`][`plugins`],
  ): Api
  setRules(
    rules:
      | ((rules: Options[`config`][`rules`]) => Options[`config`][`rules`])
      | Options[`config`][`rules`],
  ): Api
}

@options<Options>({
  cache: DynamicOption.make(
    ({context, env}) => !context.ci && !env.isTrue(`CI`),
  ),
  cacheLocation: DynamicOption.make(({cache, path}) =>
    path(cache.cacheDirectory, `stylelint.json`),
  ),
  config: undefined,
  context: DynamicOption.make(({path}) => path(`@src`)),
  failOnError: DynamicOption.make(({isProduction}) => isProduction),
  failOnWarning: false,
  files: undefined,
  fix: false,
  formatter: undefined,
  lintDirtyModulesOnly: true,
  stylelintPath: undefined,
  threads: false,
})
export class BudStylelintPublicApi extends Extension<Options, Plugin> {
  /**
   * {@link Options.cache}
   */
  public declare cache: Options[`cache`]
  /**
   * {@link Options.cache}
   */
  public declare getCache: Api[`getCache`]
  /**
   * {@link Options.cache}
   */
  public declare setCache: Api[`setCache`]

  /**
   * {@link Options.cacheLocation}
   */
  public declare cacheLocation: Options[`cacheLocation`]
  /**
   * {@link Options.cacheLocation}
   */
  public declare getCacheLocation: Api[`getCacheLocation`]
  /**
   * {@link Options.cacheLocation}
   */
  public declare setCacheLocation: Api[`setCacheLocation`]

  /**
   * {@link Options.config}
   */
  public declare config: Api[`config`]
  /**
   * {@link Options.config}
   */
  public declare getConfig: Api[`getConfig`]
  /**
   * {@link Options.config}
   */
  public declare setConfig: Api[`setConfig`]

  /**
   * {@link Options.context}
   */
  public declare context: Api[`context`]
  /**
   * {@link Options.context}
   */
  public declare getContext: Api[`getContext`]
  /**
   * {@link Options.context}
   */
  public declare setContext: Api[`setContext`]

  /**
   * {@link Options.extensions}
   */
  public declare extensions: Api[`extensions`]
  /**
   * {@link Options.extensions}
   */
  public declare getExtensions: Api[`getExtensions`]
  /**
   * {@link Options.extensions}
   */
  public declare setExtensions: Api[`setExtensions`]

  /** @todo conflict with {@link BudStylelint.failOnError} */
  // public declare failOnError: Api[`failOnError`]
  /**
   * {@link Options.failOnError}
   */
  public declare getFailOnError: Api[`getFailOnError`]
  /**
   * {@link Options.failOnError}
   */
  public declare setFailOnError: Api[`setFailOnError`]

  /** @todo conflict with {@link BudStylelint.failOnWarning} */
  // public declare failOnWarning: Api[`failOnWarning`]
  /**
   * {@link Options.failOnWarning}
   */
  public declare getFailOnWarning: Api[`getFailOnWarning`]
  /**
   * {@link Options.failOnWarning}
   */
  public declare setFailOnWarning: Api[`setFailOnWarning`]

  /**
   * {@link Options.files}
   */
  public declare files: Api[`files`]
  /**
   * {@link Options.files}
   */
  public declare getFiles: Api[`getFiles`]
  /**
   * {@link Options.files}
   */
  public declare setFiles: Api[`setFiles`]

  /** @todo conflict with {@link BudStylelint.fix} */
  // public declare fix: Api[`fix`]
  /**
   * {@link Options.fix}
   */
  public declare getFix: Api[`getFix`]
  /**
   * {@link Options.fix}
   */
  public declare setFix: Api[`setFix`]

  /**
   * {@link Options.formatter}
   */
  public declare formatter: Api[`formatter`]
  /**
   * {@link Options.formatter}
   */
  public declare getFormatter: Api[`getFormatter`]
  /**
   * {@link Options.formatter}
   */
  public declare setFormatter: Api[`setFormatter`]

  /**
   * {@link Options.lintDirtyModulesOnly}
   */
  public declare lintDirtyModulesOnly: Api[`lintDirtyModulesOnly`]
  /**
   * {@link Options.lintDirtyModulesOnly}
   */
  public declare getLintDirtyModulesOnly: Api[`getLintDirtyModulesOnly`]
  /**
   * {@link Options.lintDirtyModulesOnly}
   */
  public declare setLintDirtyModulesOnly: Api[`setLintDirtyModulesOnly`]

  /**
   * {@link Options.threads}
   */
  public declare threads: Api[`threads`]
  /**
   * {@link Options.threads}
   */
  public declare getThreads: Api[`getThreads`]
  /**
   * {@link Options.threads}
   */
  public declare setThreads: Api[`setThreads`]

  /**
   * Stylelint plugins
   *
   * @example
   * ```js
   * console.log(bud.stylelint.plugins)
   * ```
   */
  public get plugins(): Api[`config`][`plugins`] {
    return this.config?.plugins
  }
  public set plugins(plugins: Api[`config`][`plugins`]) {
    this.setConfig((config = {}) => ({...config, plugins}))
  }
  /**
   * Get stylelint plugins
   *
   * @example
   * ```js
   * console.log(bud.stylelint.getPlugins())
   * ```
   */
  @bind
  public getPlugins() {
    return this.plugins
  }
  /**
   * Set stylelint config plugins
   *
   * @example
   * ```js
   * bud.stylelint.setPlugins([])
   * ```
   *
   * @example
   * ```js
   * bud.stylelint.setPlugins(plugins => [...plugins, plugin])
   * ```
   */
  @bind
  public setPlugins(
    plugins:
      | ((
          plugins: Options[`config`][`plugins`],
        ) => Options[`config`][`plugins`])
      | Options[`config`][`plugins`],
  ) {
    this.setConfig((config = {}) => {
      return typeof plugins === `function`
        ? {...config, plugins: plugins(config.plugins)}
        : {...config, plugins}
    })
    return this
  }

  /**
   * Stylelint rules
   *
   * @example
   * ```js
   * console.log(bud.stylelint.rules)
   * ```
   */
  public get rules(): Api[`config`][`rules`] {
    return this.config?.rules
  }
  public set rules(rules: Api[`config`][`rules`]) {
    this.setConfig((config = {}) => {
      return {...config, rules: {...config.rules, ...rules}}
    })
  }
  /**
   * Get stylelint rules
   *
   * @example
   * ```js
   * console.log(bud.stylelint.getRules())
   * ```
   */
  @bind
  public getRules() {
    return this.rules
  }
  /**
   * Set stylelint config rules
   *
   * @example
   * ```js
   * bud.stylelint.setRules({'no-descending-specificity': null})
   * ```
   *
   * @example
   * ```js
   * bud.stylelint.setRules(rules => ({
   *   ...rules,
   *  'no-descending-specificity': null
   * }))
   * ```
   */
  @bind
  public setRules(
    rules:
      | ((rules: Options[`config`][`rules`]) => Options[`config`][`rules`])
      | Options[`config`][`rules`],
  ) {
    this.setConfig((config = {}) => {
      return typeof rules === `function`
        ? {...config, rules: rules(config.rules)}
        : {...config, rules: {...(config.rules ?? {}), ...rules}}
    })
    return this
  }

  /**
   * {@link Options.stylelintPath}
   */
  public declare stylelintPath: Api[`stylelintPath`]
  /**
   * {@link Options.stylelintPath}
   */
  public declare getStylelintPath: Api[`getStylelintPath`]
  /**
   * {@link Options.stylelintPath}
   */
  public declare setStylelintPath: Api[`setStylelintPath`]

  /**
   * Extend config
   *
   * @example
   * ```js
   * bud.stylelint.extends([`@roots/bud-stylelint/config`])
   * ```
   *
   * @example
   * ```js
   * bud.stylelint.extends(configs => [...configs, '@roots/bud-stylelint/config`])
   * ```
   */
  @bind
  public extends(
    configs:
      | ((configs: Api[`config`][`extends`]) => Api[`config`][`extends`])
      | Api[`config`][`extends`],
  ) {
    this.setConfig((current = {}) => {
      return typeof configs === `function`
        ? {...current, extends: configs(current.extends)}
        : {...current, extends: configs}
    })
    return this
  }
}
