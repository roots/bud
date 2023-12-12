import type {Options as EslintPluginOptions} from 'eslint-webpack-plugin'

import {
  Extension,
  type StrictPublicExtensionApi as PublicExtensionApi,
} from '@roots/bud-framework/extension'
import {bind} from '@roots/bud-framework/extension/decorators'
import Plugin from 'eslint-webpack-plugin'

export type Options = EslintPluginOptions &
  Record<string, unknown> & {
    cache: EslintPluginOptions['cache']
    cacheLocation: EslintPluginOptions['cacheLocation']
    context: EslintPluginOptions['context']
    eslintPath: EslintPluginOptions['eslintPath']
    extensions: EslintPluginOptions['extensions']
    failOnError: EslintPluginOptions['failOnError']
    failOnWarning: EslintPluginOptions['failOnWarning']
    fix: EslintPluginOptions['fix']
    formatter: EslintPluginOptions['formatter']
    lintDirtyModulesOnly: EslintPluginOptions['lintDirtyModulesOnly']
    overrideConfig: EslintPluginOptions['overrideConfig']
    resolvePluginsRelativeTo: EslintPluginOptions['resolvePluginsRelativeTo']
    threads: EslintPluginOptions['threads']
    useEslintrc: EslintPluginOptions['useEslintrc']
  }

export type Api = PublicExtensionApi<BudEslintPublicApi, Options> & {
  config: Options[`overrideConfig`]
  extends(
    config:
      | ((
          configs: Api[`overrideConfig`][`extends`],
        ) => Api[`overrideConfig`][`extends`])
      | Api[`overrideConfig`][`extends`],
  ): Api
  getConfig(): Api[`overrideConfig`]
  getPlugins(): Api[`overrideConfig`][`plugins`]
  getRules(): Api[`overrideConfig`][`rules`]
  plugins: Options[`overrideConfig`][`plugins`]
  rules: Options[`overrideConfig`][`rules`]
  setConfig(config: Api[`overrideConfig`]): Api
  setPlugins(
    plugins:
      | ((
          plugins: Options[`overrideConfig`][`plugins`],
        ) => Options[`overrideConfig`][`plugins`])
      | Options[`overrideConfig`][`plugins`],
  ): Api
  setRules(
    rules:
      | ((
          rules: Options[`overrideConfig`][`rules`],
        ) => Options[`overrideConfig`][`rules`])
      | Options[`overrideConfig`][`rules`],
  ): Api
}

export class BudEslintPublicApi extends Extension<Options, Plugin> {
  /**
   * {@link Options.cache}
   */
  public declare cache: Options['cache']

  /**
   * {@link Options.cacheLocation}
   */
  public declare cacheLocation: Options['cacheLocation']

  /**
   * {@link Options.context}
   */
  public declare context: Api['context']

  /**
   * {@link Options.eslintPath}
   */
  public declare eslintPath: Api['eslintPath']

  /**
   * {@link Options.extensions}
   */
  public declare extensions: Api['extensions']

  /**
   * {@link Options.failOnError}
   */
  public declare failOnError: Api['failOnError']

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
   * {@link Options.context}
   */
  public declare getContext: Api['getContext']

  /**
   * {@link Options.eslintPath}
   */
  public declare getEslintPath: Api['getEslintPath']

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

  /** @todo conflict with {@link BudEslint.fix} */
  // public declare fix: Api['fix']

  /**
   * {@link Options.overrideConfig}
   */
  public declare getOverrideConfig: Api['getOverrideConfig']

  /**
   * {@link Options.resolvePluginsRelativeTo}
   */
  public declare getResolvePluginsRelativeTo: Api['getResolvePluginsRelativeTo']

  /**
   * {@link Options.threads}
   */
  public declare getThreads: Api['getThreads']

  /**
   * {@link Options.useEslintRc}
   */
  public declare getUseEslintrc: Api['getUseEslintrc']

  /**
   * {@link Options.lintDirtyModulesOnly}
   */
  public declare lintDirtyModulesOnly: Api['lintDirtyModulesOnly']

  /**
   * {@link Options.overrideConfig}
   */
  public declare overrideConfig: Api['overrideConfig']

  /**
   * {@link Options.resolvePluginsRelativeTo}
   */
  public declare resolvePluginsRelativeTo: Api['resolvePluginsRelativeTo']

  /**
   * {@link Options.cache}
   */
  public declare setCache: Api['setCache']

  /**
   * {@link Options.cacheLocation}
   */
  public declare setCacheLocation: Api['setCacheLocation']

  /**
   * {@link Options.context}
   */
  public declare setContext: Api['setContext']

  /**
   * {@link Options.eslintPath}
   */
  public declare setEslintPath: Api['setEslintPath']

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
   * {@link Options.overrideConfig}
   */
  public declare setOverrideConfig: Api['setOverrideConfig']

  /**
   * {@link Options.resolvePluginsRelativeTo}
   */
  public declare setResolvePluginsRelativeTo: Api['setResolvePluginsRelativeTo']

  /**
   * {@link Options.threads}
   */
  public declare setThreads: Api['setThreads']

  /**
   * {@link Options.useEslintRc}
   */
  public declare setUseEslintrc: Api['setUseEslintrc']

  /**
   * {@link Options.threads}
   */
  public declare threads: Api['threads']

  /**
   * {@link Options.useEslintRc}
   */
  public declare useEslintrc: Api['useEslintrc']

  /**
   * Eslint plugins
   *
   * @example
   * ```js
   * console.log(bud.eslint.plugins)
   * ```
   */
  public get plugins(): Api[`overrideConfig`][`plugins`] {
    return this.overrideConfig.plugins
  }
  public set plugins(plugins: Api[`overrideConfig`][`plugins`]) {
    this.setOverrideConfig((config = {}) => {
      return {...config, plugins: [...(config?.plugins ?? []), ...plugins]}
    })
  }

  /**
   * Eslint rules
   *
   * @example
   * ```js
   * console.log(bud.eslint.rules)
   * ```
   */
  public get rules(): Api[`overrideConfig`][`rules`] {
    return this.overrideConfig.rules
  }
  public set rules(rules: Api[`overrideConfig`][`rules`]) {
    this.setOverrideConfig((config = {}) => {
      return {...config, rules: {...config.rules, ...rules}}
    })
  }

  /**
   * {@link Options.overrideConfig}
   */
  public get config() {
    return this.overrideConfig
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
      | ((
          configs: Api[`overrideConfig`][`extends`],
        ) => Api[`overrideConfig`][`extends`])
      | Api[`overrideConfig`][`extends`],
  ) {
    this.setConfig((current = {}) => {
      return typeof config === `function`
        ? {...current, extends: config(current.extends)}
        : {...current, extends: [...(current?.extends ?? []), ...config]}
    })
    return this
  }

  /**
   * {@link Options.overrideConfig}
   */
  public getConfig() {
    return this.config
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
   * {@link Options.overrideConfig}
   */
  public setConfig(
    config:
      | ((config: Api['overrideConfig']) => Api['overrideConfig'])
      | Api['overrideConfig'],
  ) {
    this.setOverrideConfig(config)
    return this
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
      | ((
          plugins: Options[`overrideConfig`][`plugins`],
        ) => Options[`overrideConfig`][`plugins`])
      | Options[`overrideConfig`][`plugins`],
  ) {
    this.setOverrideConfig((config = {}) => {
      return typeof plugins === `function`
        ? {...config, plugins: plugins(config.plugins)}
        : {...config, plugins: [...(config?.plugins ?? []), ...plugins]}
    })
    return this
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
      | ((
          rules: Options[`overrideConfig`][`rules`],
        ) => Options[`overrideConfig`][`rules`])
      | Options[`overrideConfig`][`rules`],
  ) {
    this.setOverrideConfig((config = {}) => {
      return typeof rules === `function`
        ? {...config, rules: rules(config.rules)}
        : {...config, rules: {...(config.rules ?? {}), ...rules}}
    })
    return this
  }
}
