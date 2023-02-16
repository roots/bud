import {Bud, Extension} from '@roots/bud-framework'
import {
  bind,
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import type {Options} from 'eslint-webpack-plugin'
import EslintPlugin from 'eslint-webpack-plugin'

/**
 * Eslint webpack plugin adapter
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
  threads: false,
})
export class BudEslint extends Extension<Options, EslintPlugin> {
  /**
   * `register` callback
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

  /**
   * auto-fix rule violations
   *
   * @deprecated - Use `bud.eslint.set('fix', true)` instead.
   */
  @bind
  public fix(fix: boolean = true): this {
    this.set(`fix`, fix)
    return this
  }
}
