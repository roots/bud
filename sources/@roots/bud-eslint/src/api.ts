import {
  Extension,
  type StrictPublicExtensionApi as PublicExtensionApi,
} from '@roots/bud-framework/extension'
import {bind} from '@roots/bud-framework/extension/decorators'
import type {Options as EslintPluginOptions} from 'eslint-webpack-plugin'
import Plugin from 'eslint-webpack-plugin'

export type Options = EslintPluginOptions &
  Record<string, unknown> & {
    failOnWarning: EslintPluginOptions['failOnWarning']
    failOnError: EslintPluginOptions['failOnError']
    cache: EslintPluginOptions['cache']
    cacheLocation: EslintPluginOptions['cacheLocation']
    context: EslintPluginOptions['context']
    extensions: EslintPluginOptions['extensions']
    fix: EslintPluginOptions['fix']
    lintDirtyModulesOnly: EslintPluginOptions['lintDirtyModulesOnly']
    resolvePluginsRelativeTo: EslintPluginOptions['resolvePluginsRelativeTo']
    formatter: EslintPluginOptions['formatter']
    threads: EslintPluginOptions['threads']
    useEslintrc: EslintPluginOptions['useEslintrc']
    eslintPath: EslintPluginOptions['eslintPath']
    overrideConfig: EslintPluginOptions['overrideConfig']
  }

export type Api = PublicExtensionApi<BudEslintPublicApi, Options> & {
  config: Options[`overrideConfig`]
  getConfig(): Api[`overrideConfig`]
  setConfig(config: Api[`overrideConfig`]): Api
  rules: Options[`overrideConfig`][`rules`]
  setRules(
    rules:
      | Options[`overrideConfig`][`rules`]
      | ((
          rules: Options[`overrideConfig`][`rules`],
        ) => Options[`overrideConfig`][`rules`]),
  ): Api
  getRules(): Api[`overrideConfig`][`rules`]
  plugins: Options[`overrideConfig`][`plugins`]
  setPlugins(
    plugins:
      | Options[`overrideConfig`][`plugins`]
      | ((
          plugins: Options[`overrideConfig`][`plugins`],
        ) => Options[`overrideConfig`][`plugins`]),
  ): Api
  getPlugins(): Api[`overrideConfig`][`plugins`]
  extends(
    config:
      | Api[`overrideConfig`][`extends`]
      | ((
          configs: Api[`overrideConfig`][`extends`],
        ) => Api[`overrideConfig`][`extends`]),
  ): Api
}

export class BudEslintPublicApi extends Extension<Options, Plugin> {
  /**
   * {@link Options.failOnWarning}
   */
  public declare getFailOnWarning: Api['getFailOnWarning']

  /**
   * {@link Options.failOnWarning}
   */
  public declare setFailOnWarning: Api['setFailOnWarning']

  /**
   * {@link Options.failOnError}
   */
  public declare failOnError: Api['failOnError']

  /**
   * {@link Options.failOnError}
   */
  public declare getFailOnError: Api['getFailOnError']

  /**
   * {@link Options.failOnError}
   */
  public declare setFailOnError: Api['setFailOnError']

  /**
   * {@link Options.cache}
   */
  public declare cache: Options['cache']

  /**
   * {@link Options.cache}
   */
  public declare getCache: Api['getCache']

  /**
   * {@link Options.cache}
   */
  public declare setCache: Api['setCache']

  /**
   * {@link Options.cacheLocation}
   */
  public declare cacheLocation: Options['cacheLocation']

  /**
   * {@link Options.cacheLocation}
   */
  public declare getCacheLocation: Api['getCacheLocation']

  /**
   * {@link Options.cacheLocation}
   */
  public declare setCacheLocation: Api['setCacheLocation']

  /**
   * {@link Options.context}
   */
  public declare context: Api['context']

  /**
   * {@link Options.context}
   */
  public declare getContext: Api['getContext']

  /**
   * {@link Options.context}
   */
  public declare setContext: Api['setContext']

  /**
   * {@link Options.extensions}
   */
  public declare extensions: Api['extensions']

  /**
   * {@link Options.extensions}
   */
  public declare getExtensions: Api['getExtensions']

  /**
   * {@link Options.extensions}
   */
  public declare setExtensions: Api['setExtensions']

  /** @todo conflict with {@link BudEslint.fix} */
  // public declare fix: Api['fix']

  /**
   * {@link Options.fix}
   */
  public declare getFix: Api['getFix']

  /**
   * {@link Options.fix}
   */
  public declare setFix: Api['setFix']

  /**
   * {@link Options.lintDirtyModulesOnly}
   */
  public declare lintDirtyModulesOnly: Api['lintDirtyModulesOnly']

  /**
   * {@link Options.lintDirtyModulesOnly}
   */
  public declare getLintDirtyModulesOnly: Api['getLintDirtyModulesOnly']

  /**
   * {@link Options.lintDirtyModulesOnly}
   */
  public declare setLintDirtyModulesOnly: Api['setLintDirtyModulesOnly']

  /**
   * {@link Options.resolvePluginsRelativeTo}
   */
  public declare resolvePluginsRelativeTo: Api['resolvePluginsRelativeTo']

  /**
   * {@link Options.resolvePluginsRelativeTo}
   */
  public declare getResolvePluginsRelativeTo: Api['getResolvePluginsRelativeTo']

  /**
   * {@link Options.resolvePluginsRelativeTo}
   */
  public declare setResolvePluginsRelativeTo: Api['setResolvePluginsRelativeTo']

  /**
   * {@link Options.formatter}
   */
  public declare formatter: Api['formatter']

  /**
   * {@link Options.formatter}
   */
  public declare getFormatter: Api['getFormatter']

  /**
   * {@link Options.formatter}
   */
  public declare setFormatter: Api['setFormatter']

  /**
   * {@link Options.threads}
   */
  public declare threads: Api['threads']

  /**
   * {@link Options.threads}
   */
  public declare getThreads: Api['getThreads']

  /**
   * {@link Options.threads}
   */
  public declare setThreads: Api['setThreads']

  /**
   * {@link Options.useEslintRc}
   */
  public declare useEslintrc: Api['useEslintrc']

  /**
   * {@link Options.useEslintRc}
   */
  public declare getUseEslintrc: Api['getUseEslintrc']

  /**
   * {@link Options.useEslintRc}
   */
  public declare setUseEslintrc: Api['setUseEslintrc']

  /**
   * {@link Options.eslintPath}
   */
  public declare eslintPath: Api['eslintPath']

  /**
   * {@link Options.eslintPath}
   */
  public declare getEslintPath: Api['getEslintPath']

  /**
   * {@link Options.eslintPath}
   */
  public declare setEslintPath: Api['setEslintPath']

  /**
   * {@link Options.overrideConfig}
   */
  public declare overrideConfig: Api['overrideConfig']

  /**
   * {@link Options.overrideConfig}
   */
  public declare getOverrideConfig: Api['getOverrideConfig']

  /**
   * {@link Options.overrideConfig}
   */
  public declare setOverrideConfig: Api['setOverrideConfig']

  /**
   * {@link Options.overrideConfig}
   */
  public get config() {
    return this.overrideConfig
  }

  /**
   * {@link Options.overrideConfig}
   */
  public getConfig() {
    return this.config
  }

  /**
   * {@link Options.overrideConfig}
   */
  public setConfig(
    config:
      | Api['overrideConfig']
      | ((config: Api['overrideConfig']) => Api['overrideConfig']),
  ) {
    this.setOverrideConfig(config)
    return this
  }

  /**
   * Get eslint rules
   *
   * @example
   * ```js
   * console.log(bud.eslint.rules)
   * ```
   */
  public get rules(): Api[`overrideConfig`][`rules`] {
    return this.overrideConfig.rules
  }

  /**
   * Set eslint rules
   *
   * @example
   * ```js
   * bud.eslint.rules = {
   *  'no-console': 'off',
   * }
   * ```
   */
  public set rules(rules: Api[`overrideConfig`][`rules`]) {
    this.setOverrideConfig((config = {}) => {
      return {...config, rules: {...config.rules, ...rules}}
    })
  }

  /**
   * Get eslint rules
   *
   * @example
   * ```js
   * console.log(bud.eslint.getRules())
   * ```
   */
  @bind
  public getRules() {
    return this.rules
  }

  /**
   * Set eslint config rules
   *
   * @example
   * ```js
   * bud.eslint.setRules({
   *   'no-console': 'off',
   * })
   * ```
   *
   * @example
   * ```js
   * bud.eslint.setRules(rules => ({
   *   ...rules,
   *  'no-console': 'off',
   * }))
   * ```
   */
  @bind
  public setRules(
    rules:
      | Options[`overrideConfig`][`rules`]
      | ((
          rules: Options[`overrideConfig`][`rules`],
        ) => Options[`overrideConfig`][`rules`]),
  ) {
    this.setOverrideConfig((config = {}) => {
      return typeof rules === `function`
        ? {...config, rules: rules(config.rules)}
        : {...config, rules: {...(config.rules ?? {}), ...rules}}
    })
    return this
  }

  /**
   * Get eslint plugins
   *
   * @example
   * ```js
   * console.log(bud.eslint.plugins)
   * ```
   */
  public get plugins(): Api[`overrideConfig`][`plugins`] {
    return this.overrideConfig.plugins
  }

  /**
   * Set eslint plugins
   *
   * @example
   * ```js
   * bud.eslint.plugins = {
   *  'no-console': 'off',
   * }
   * ```
   */
  public set plugins(plugins: Api[`overrideConfig`][`plugins`]) {
    this.setOverrideConfig((config = {}) => {
      return {...config, plugins: [...(config?.plugins ?? []), ...plugins]}
    })
  }

  /**
   * Get eslint plugins
   *
   * @example
   * ```js
   * console.log(bud.eslint.getPlugins())
   * ```
   */
  @bind
  public getPlugins() {
    return this.plugins
  }

  /**
   * Set eslint config plugins
   *
   * @example
   * ```js
   * bud.eslint.setPlugins({
   *   'no-console': 'off',
   * })
   * ```
   *
   * @example
   * ```js
   * bud.eslint.setPlugins(plugins => ({
   *   ...plugins,
   *  'no-console': 'off',
   * }))
   * ```
   */
  @bind
  public setPlugins(
    plugins:
      | Options[`overrideConfig`][`plugins`]
      | ((
          plugins: Options[`overrideConfig`][`plugins`],
        ) => Options[`overrideConfig`][`plugins`]),
  ) {
    this.setOverrideConfig((config = {}) => {
      return typeof plugins === `function`
        ? {...config, plugins: plugins(config.plugins)}
        : {...config, plugins: [...(config?.plugins ?? []), ...plugins]}
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
      | Api[`overrideConfig`][`extends`]
      | ((
          configs: Api[`overrideConfig`][`extends`],
        ) => Api[`overrideConfig`][`extends`]),
  ) {
    this.setConfig((current = {}) => {
      return typeof config === `function`
        ? {...current, extends: config(current.extends)}
        : {...current, extends: [...(current?.extends ?? []), ...config]}
    })
    return this
  }
}
