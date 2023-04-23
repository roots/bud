import {Bud, Extension} from '@roots/bud-framework'
import {
  bind,
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import {deprecated} from '@roots/bud-support/decorators'
import type {Options} from 'eslint-webpack-plugin'
import EslintPlugin from 'eslint-webpack-plugin'

import BudEslintCacheFix from './cache-fix/index.js'

/**
 * Eslint configuration
 */
@label(`@roots/bud-eslint`)
@expose(`eslint`)
@plugin(EslintPlugin)
@options<Options>({
  cache: true,
  cacheLocation: app => app.path(app.cache.cacheDirectory, `eslint.json`),
  context: app => app.path(),
  extensions: [`js`, `jsx`, `ts`, `tsx`, `vue`],
  fix: false,
  lintDirtyModulesOnly: app => app.isDevelopment,
  resolvePluginsRelativeTo: app => app.path(),
  threads: true,
})
export class BudEslint extends Extension<Options, EslintPlugin> {
  /**
   * @deprecated This is no longer necessary. There was a fix upstream.
   */
  public cacheFix: BudEslintCacheFix = new BudEslintCacheFix()

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register(bud: Bud) {
    /**
     * Resolve eslint
     */
    this.set(`eslintPath`, await this.resolve(`eslint`, import.meta.url))

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
        this.set(`overrideConfig`, config.module).set(`useEslintrc`, false)
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

  /**
   * @deprecated Use {@link Extension.set} instead
   */
  @deprecated(`bud.eslint`, `Use bud.eslint.set instead`, [
    [`Enable autofix`, `bud.eslint.set('fix', true)`],
    [`Disable autofix`, `bud.eslint.set('fix', false)`],
  ])
  public fix(fix: boolean = true): this {
    this.set(`fix`, fix)
    return this
  }
}
