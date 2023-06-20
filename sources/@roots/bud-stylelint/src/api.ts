import {
  DynamicOption,
  Extension,
  type StrictPublicExtensionApi as PublicExtensionApi,
} from '@roots/bud-framework/extension'
import {bind, options} from '@roots/bud-framework/extension/decorators'
import Plugin from 'stylelint-webpack-plugin'

export type Options = Plugin.Options &
  Record<string, unknown> & {
    cache: Plugin.Options['cache']
    cacheLocation: Plugin.Options['cacheLocation']
    config: Plugin.Options[`config`]
    context: Plugin.Options['context']
    extensions: Plugin.Options['extensions']
    failOnError: Plugin.Options['failOnError']
    failOnWarning: Plugin.Options['failOnWarning']
    files: Plugin.Options[`files`]
    fix: Plugin.Options['fix']
    formatter: Plugin.Options['formatter']
    lintDirtyModulesOnly: Plugin.Options['lintDirtyModulesOnly']
    stylelintPath: Plugin.Options[`stylelintPath`]
    threads: Plugin.Options['threads']
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
  config: DynamicOption.make(
    ({context}) =>
      Object.values(context.files ?? {}).find(({name}) =>
        name.includes(`stylelint`),
      )?.module ?? undefined,
  ),
  context: DynamicOption.make(({path}) => path(`@src`)),
  failOnError: DynamicOption.make(({isProduction}) => isProduction),
  failOnWarning: false,
  files: undefined,
  fix: false,
  stylelintPath: undefined,
})
export class BudStylelintPublicApi extends Extension<Options, Plugin> {
  /**
   * {@link Options.cache}
   */
  public declare cache: Options['cache']
  /**
   * {@link Options.cacheLocation}
   */
  public declare cacheLocation: Options['cacheLocation']
  /**
   * {@link Options.config}
   */
  public declare config: Api[`config`]

  /**
   * {@link Options.context}
   */
  public declare context: Api['context']
  /**
   * {@link Options.extensions}
   */
  public declare extensions: Api['extensions']
  /**
   * {@link Options.files}
   */
  public declare files: Api[`files`]

  /**
   * {@link Options.formatter}
   */
  public declare formatter: Api['formatter']

  /**
   * {@link Options.cache}
   */
  public declare getCache: Api['getCache']

  /**
   * {@link Options.cacheLocation}
   */
  public declare getCacheLocation: Api['getCacheLocation']

  /**
   * {@link Options.config}
   */
  public declare getConfig: Api[`getConfig`]

  /**
   * {@link Options.context}
   */
  public declare getContext: Api['getContext']

  /**
   * {@link Options.extensions}
   */
  public declare getExtensions: Api['getExtensions']

  /**
   * {@link Options.failOnError}
   */
  public declare getFailOnError: Api['getFailOnError']

  /**
   * {@link Options.failOnWarning}
   */
  public declare getFailOnWarning: Api['getFailOnWarning']

  /**
   * {@link Options.files}
   */
  public declare getFiles: Api[`getFiles`]

  /**
   * {@link Options.fix}
   */
  public declare getFix: Api['getFix']

  /**
   * {@link Options.formatter}
   */
  public declare getFormatter: Api['getFormatter']

  /**
   * {@link Options.lintDirtyModulesOnly}
   */
  public declare getLintDirtyModulesOnly: Api['getLintDirtyModulesOnly']

  /**
   * {@link Options.threads}
   */
  public declare getThreads: Api['getThreads']

  /**
   * {@link Options.lintDirtyModulesOnly}
   */
  public declare lintDirtyModulesOnly: Api['lintDirtyModulesOnly']

  /**
   * {@link Options.cache}
   */
  public declare setCache: Api['setCache']

  /**
   * {@link Options.cacheLocation}
   */
  public declare setCacheLocation: Api['setCacheLocation']

  /** @todo conflict with {@link BudStylelint.fix} */
  // public declare fix: Api['fix']

  /**
   * {@link Options.config}
   */
  public declare setConfig: Api[`setConfig`]

  /**
   * {@link Options.context}
   */
  public declare setContext: Api['setContext']

  /**
   * {@link Options.extensions}
   */
  public declare setExtensions: Api['setExtensions']

  /**
   * {@link Options.failOnError}
   */
  public declare setFailOnError: Api['setFailOnError']

  /**
   * {@link Options.failOnWarning}
   */
  public declare setFailOnWarning: Api['setFailOnWarning']

  /**
   * {@link Options.files}
   */
  public declare setFiles: Api[`setFiles`]

  /**
   * {@link Options.fix}
   */
  public declare setFix: Api['setFix']

  /**
   * {@link Options.formatter}
   */
  public declare setFormatter: Api['setFormatter']

  /**
   * {@link Options.lintDirtyModulesOnly}
   */
  public declare setLintDirtyModulesOnly: Api['setLintDirtyModulesOnly']

  /**
   * {@link Options.threads}
   */
  public declare setThreads: Api['setThreads']

  /**
   * {@link Options.threads}
   */
  public declare threads: Api['threads']

  /**
   * Extend config
   *
   * @example
   * ```js
   * bud.stylelint.extends(['@roots/bud-stylelint/config'])
   * ```
   *
   * @example
   * ```js
   * bud.stylelint.extends(configs => [...configs, '@roots/bud-stylelint/config'])
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
   * Get stylelint plugins
   *
   * @example
   * ```js
   * console.log(bud.stylelint.plugins)
   * ```
   */
  public get plugins(): Api[`config`][`plugins`] {
    return this.config.plugins
  }

  /**
   * Set stylelint plugins
   *
   * @example
   * ```js
   * bud.stylelint.plugins = []
   * ```
   */
  public set plugins(plugins: Api[`config`][`plugins`]) {
    this.setConfig((config = {}) => ({...config, plugins}))
  }

  /**
   * Get stylelint rules
   *
   * @example
   * ```js
   * console.log(bud.stylelint.rules)
   * ```
   */
  public get rules(): Api[`config`][`rules`] {
    return this.config.rules
  }

  /**
   * Set stylelint rules
   *
   * @example
   * ```js
   * bud.stylelint.rules = {'no-descending-specificity': null}
   * ```
   */
  public set rules(rules: Api[`config`][`rules`]) {
    this.setConfig((config = {}) => {
      return {...config, rules: {...config.rules, ...rules}}
    })
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
}
