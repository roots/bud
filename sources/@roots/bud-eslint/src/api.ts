import {
  Extension,
  type StrictPublicExtensionApi as PublicExtensionApi,
} from '@roots/bud-framework/extension'
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

export type Api = PublicExtensionApi<BudEslintPublicApi, Options>

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
}
