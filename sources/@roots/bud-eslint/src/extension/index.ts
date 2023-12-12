import type {Bud} from '@roots/bud-framework'

import {
  type Api,
  BudEslintPublicApi,
  type Options,
} from '@roots/bud-eslint/api'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  deprecated,
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import Value from '@roots/bud-support/value'
import Plugin from 'eslint-webpack-plugin'

/**
 * Eslint configuration
 */
@label(`@roots/bud-eslint`)
@expose(`eslint`)
@plugin(Plugin)
@options<Options>({
  cache: true,
  cacheLocation: Value.make(({cache, path}) =>
    path(cache.cacheDirectory, `eslint.json`),
  ),
  context: Value.make(({path}) => path()),
  eslintPath: undefined,
  extensions: [`js`, `jsx`, `ts`, `tsx`, `vue`],
  failOnError: Value.make(({isProduction}) => isProduction),
  failOnWarning: false,
  fix: false,
  formatter: `stylish`,
  lintDirtyModulesOnly: Value.make(({isDevelopment}) => isDevelopment),
  overrideConfig: undefined,
  resolvePluginsRelativeTo: Value.make(({path}) => path()),
  threads: false,
  useEslintrc: false,
})
class BudEslint extends BudEslintPublicApi implements Api {
  /**
   * @deprecated Use {@link Extension.set} instead
   */
  @deprecated(`bud.eslint`, `Use bud.eslint.setFix instead`, [
    [`Enable fix`, `bud.eslint.setFix(true)`],
    [`Disable fix`, `bud.eslint.setFix(false)`],
    [`Check if fix is enabled`, `bud.eslint.getFix()`],
    [`Assign a value`, `bud.eslint.fix = true`],
  ])
  // @ts-ignore
  public fix(fix: boolean = true): this {
    this.setFix(fix)
    return this
  }

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register({context, hooks}: Bud) {
    /**
     * Resolve eslint
     */
    try {
      this.setEslintPath(await this.resolve(`eslint`, import.meta.url))
    } catch (err) {
      throw err
    }

    /**
     * Add {@link config.path} to cache dependencies if available
     */
    const config = Object.values(context.files).find(({name}) =>
      name.includes(`eslint`),
    )

    if (config) {
      hooks.on(`build.cache.buildDependencies`, (deps = {}) => ({
        ...deps,
        eslint: [config.path],
      }))
      this.setOverrideConfig(await config.module())
    } else {
      this.setUseEslintrc(true)
    }
  }
}

export {type Api, BudEslint, type BudEslintPublicApi, type Options}
