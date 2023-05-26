import type {Bud} from '@roots/bud-framework'
import {Extension, type Option} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import Value from '@roots/bud-framework/value'
import {deprecated} from '@roots/bud-support/decorators'
import type {Options as EslintOptions} from 'eslint-webpack-plugin'
import Plugin from 'eslint-webpack-plugin'

import BudEslintCacheFix from './cache-fix/index.js'

type OptionsMap = {
  [K in keyof EslintOptions as `${K & string}`]: Option<
    BudEslint,
    Options,
    K
  >
}

export type Options = {
  [K in keyof OptionsMap as `${K & string}`]: EslintOptions[K]
}

/**
 * Eslint configuration
 */
@label(`@roots/bud-eslint`)
@expose(`eslint`)
@plugin(Plugin)
@options<Options>({
  cache: true,
  cacheLocation: new Value(({cache, path}) =>
    path(cache.cacheDirectory, `eslint.json`),
  ),
  context: new Value(({path}) => path()),
  eslintPath: undefined,
  extensions: [`js`, `jsx`, `ts`, `tsx`, `vue`],
  failOnError: new Value(({isProduction}) => isProduction),
  failOnWarning: new Value(({isProduction}) => isProduction),
  fix: false,
  lintDirtyModulesOnly: new Value(({isDevelopment}) => isDevelopment),
  overrideConfig: undefined,
  resolvePluginsRelativeTo: new Value(({path}) => path()),
  threads: false,
  useEslintrc: true,
})
export class BudEslint extends Extension<Options, Plugin> {
  /**
   * @deprecated Use {@link Extension.set} instead
   */
  @deprecated(`bud.eslint`, `Use bud.eslint.setFix instead`, [
    [`Enable fix`, `bud.eslint.setFix(true)`],
    [`Disable fix`, `bud.eslint.setFix(false)`],
    [`Check if fix is enabled`, `bud.eslint.getFix()`],
    [`Assign a value`, `bud.eslint.fix = true`],
  ])
  public fix(fix: boolean = true): this {
    this.setFix(fix)
    return this
  }

  /**
   * @deprecated This is no longer necessary. There was a fix upstream.
   */
  public cacheFix: BudEslintCacheFix = new BudEslintCacheFix()

  /**
   * {@link EslintOptions.failOnWarning}
   */
  public declare failOnWarning: EslintOptions['failOnWarning']
  /**
   * {@link EslintOptions.failOnWarning}
   */
  public declare getFailOnWarning: OptionsMap['failOnWarning']['get']
  /**
   * {@link EslintOptions.failOnWarning}
   */
  public declare setFailOnWarning: OptionsMap['failOnWarning']['set']

  /**
   * {@link EslintOptions.failOnError}
   */
  public declare failOnError: EslintOptions['failOnError']
  /**
   * {@link EslintOptions.failOnError}
   */
  public declare getFailOnError: OptionsMap['failOnError']['get']
  /**
   * {@link EslintOptions.failOnError}
   */
  public declare setFailOnError: OptionsMap['failOnError']['set']

  /**
   * {@link EslintOptions.cache}
   */
  public declare cache: EslintOptions['cache']
  /**
   * {@link EslintOptions.cache}
   */
  public declare getCache: OptionsMap['cache']['get']
  /**
   * {@link EslintOptions.cache}
   */
  public declare setCache: OptionsMap['cache']['set']

  /**
   * {@link EslintOptions.cacheLocation}
   */
  public declare cacheLocation: EslintOptions['cacheLocation']
  /**
   * {@link EslintOptions.cacheLocation}
   */
  public declare getCacheLocation: OptionsMap['cacheLocation']['get']
  /**
   * {@link EslintOptions.cacheLocation}
   */
  public declare setCacheLocation: OptionsMap['cacheLocation']['set']

  /**
   * {@link EslintOptions.context}
   */
  public declare context: OptionsMap['context']['value']
  /**
   * {@link EslintOptions.context}
   */
  public declare getContext: OptionsMap['context']['get']
  /**
   * {@link EslintOptions.context}
   */
  public declare setContext: OptionsMap['context']['set']

  /**
   * {@link EslintOptions.extensions}
   */
  public declare extensions: OptionsMap['extensions']['value']
  /**
   * {@link EslintOptions.extensions}
   */
  public declare getExtensions: OptionsMap['extensions']['get']
  /**
   * {@link EslintOptions.extensions}
   */
  public declare setExtensions: OptionsMap['extensions']['set']

  /** @todo conflict with {@link BudEslint.fix} */
  // public declare fix: OptionsMap['fix']['value']
  /**
   * {@link EslintOptions.fix}
   */
  public declare getFix: OptionsMap['fix']['get']
  /**
   * {@link EslintOptions.fix}
   */
  public declare setFix: OptionsMap['fix']['set']

  /**
   * {@link EslintOptions.lintDirtyModulesOnly}
   */
  public declare lintDirtyModulesOnly: OptionsMap['lintDirtyModulesOnly']['value']
  /**
   * {@link EslintOptions.lintDirtyModulesOnly}
   */
  public declare getLintDirtyModulesOnly: OptionsMap['lintDirtyModulesOnly']['get']
  /**
   * {@link EslintOptions.lintDirtyModulesOnly}
   */
  public declare setLintDirtyModulesOnly: OptionsMap['lintDirtyModulesOnly']['set']

  /**
   * {@link EslintOptions.resolvePluginsRelativeTo}
   */
  public declare resolvePluginsRelativeTo: OptionsMap['resolvePluginsRelativeTo']['value']
  /**
   * {@link EslintOptions.resolvePluginsRelativeTo}
   */
  public declare getResolvePluginsRelativeTo: OptionsMap['resolvePluginsRelativeTo']['get']
  /**
   * {@link EslintOptions.resolvePluginsRelativeTo}
   */
  public declare setResolvePluginsRelativeTo: OptionsMap['resolvePluginsRelativeTo']['set']

  /**
   * {@link EslintOptions.threads}
   */
  public declare threads: OptionsMap['threads']['value']
  /**
   * {@link EslintOptions.threads}
   */
  public declare getThreads: OptionsMap['threads']['get']
  /**
   * {@link EslintOptions.threads}
   */
  public declare setThreads: OptionsMap['threads']['set']

  /**
   * {@link EslintOptions.useEslintRc}
   */
  public declare useEslintrc: OptionsMap['useEslintrc']['value']
  /**
   * {@link EslintOptions.useEslintRc}
   */
  public declare getUseEslintrc: OptionsMap['useEslintrc']['get']
  /**
   * {@link EslintOptions.useEslintRc}
   */
  public declare setUseEslintrc: OptionsMap['useEslintrc']['set']

  /**
   * {@link EslintOptions.eslintPath}
   */
  public declare eslintPath: OptionsMap['eslintPath']['value']
  /**
   * {@link EslintOptions.eslintPath}
   */
  public declare getEslintPath: OptionsMap['eslintPath']['get']
  /**
   * {@link EslintOptions.eslintPath}
   */
  public declare setEslintPath: OptionsMap['eslintPath']['set']

  /**
   * {@link EslintOptions.overrideConfig}
   */
  public declare overrideConfig: OptionsMap['overrideConfig']['value']
  /**
   * {@link EslintOptions.overrideConfig}
   */
  public declare getOverrideConfig: OptionsMap['overrideConfig']['get']
  /**
   * {@link EslintOptions.overrideConfig}
   */
  public declare setOverrideConfig: OptionsMap['overrideConfig']['set']

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register(bud: Bud) {
    /**
     * Resolve eslint
     */
    this.setEslintPath(await this.resolve(`eslint`, import.meta.url))

    if (!bud.context.files) return
    const config = Object.values(bud.context.files).find(
      ({file, name}) => file && name.includes(`eslint`),
    )

    if (config) {
      /**
       * Add eslint config to cache dependencies
       */
      bud.hooks.on(`build.cache.buildDependencies`, (deps = {}) => ({
        ...deps,
        eslint: [config.path],
      }))

      /**
       * If eslint config was successfully imported during bootstrap, set the module as the `overrideConfig`.
       */
      if (config.module) {
        this.setOverrideConfig(config.module).setUseEslintrc(false)
        return
      }

      /**
       * Otherwise, attempt to parse the config file as json or yml. If that fails, warn the user who may be
       * using a deprecated config format (`.eslintrc`) and attempt to parse as json.
       */
      switch (config.dynamic) {
        case true:
          config.module = await this.import(config.path, import.meta.url)
          break

        default:
          switch (config.extension) {
            case `json`:
              config.module = await bud.fs.json.read(config.path)
              break

            case `yml`:
              config.module = await bud.fs.yml.read(config.path)
              break

            case `yaml`:
              config.module = await bud.fs.yml.read(config.path)
              break

            default:
              this.logger.warn(
                `Unknown eslint config format.`,
                `Please update \`${config.name}\` to use one of: js, cjs, mjs, json, yml, yaml`,
              )

              try {
                config.module = await bud.fs.json.read(config.path)
                this.logger.warn(
                  `Unknown eslint config format.`,
                  `Parsed as json.`,
                )
              } catch (err) {
                try {
                  config.module = await bud.fs.yml.read(config.path)
                  this.logger.warn(
                    `Unknown eslint config format.`,
                    `Parsed as yml.`,
                  )
                } catch (err) {
                  this.logger.error(
                    `Unknown eslint config format.`,
                    `Could not parse ${config.name} as json or yml.`,
                  )
                }
              }
          }
      }
    }
  }
}
