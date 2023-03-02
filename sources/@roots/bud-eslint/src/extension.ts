import {Bud, Extension} from '@roots/bud-framework'
import {
  bind,
  dependsOn,
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import {deprecated} from '@roots/bud-support/decorators'
import type {Options} from 'eslint-webpack-plugin'
import EslintPlugin from 'eslint-webpack-plugin'

import type BudEslintCacheFix from './cache-fix/index.js'

/**
 * Eslint configuration
 */
@label(`@roots/bud-eslint`)
@expose(`eslint`)
@plugin(EslintPlugin)
@options<Options>({
  extensions: [`js`, `jsx`, `ts`, `tsx`, `vue`],
  cacheLocation: app => app.path(`@storage`, app.label, `cache`, `eslint`),
  fix: false,
  context: app => app.path(),
  resolvePluginsRelativeTo: app => app.path(),
  threads: true,
})
@dependsOn([`@roots/bud-eslint/cache-fix`])
export class BudEslint extends Extension<Options, EslintPlugin> {
  /**
   * Persistent cache fix
   */
  public cacheFix: BudEslintCacheFix

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register(bud: Bud) {
    this.set(`eslintPath`, await this.resolve(`eslint`))

    const findFlatConfig = ({name}) => name.includes(`eslint.config`)

    const userConfigs = Object.values(bud.context.config)
    if (!userConfigs.some(findFlatConfig)) return

    const flatConfig = userConfigs.find(findFlatConfig)
    this.set(`baseConfig`, flatConfig.module)
  }

  @bind
  @deprecated(`bud.eslint`, `Use bud.eslint.set instead`, [
    [`Enable autofix`, `bud.eslint.set('fix', true)`],
    [`Disable autofix`, `bud.eslint.set('fix', false)`],
  ])
  public fix(fix: boolean = true): this {
    this.set(`fix`, fix)
    return this
  }
}
