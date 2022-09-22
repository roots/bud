import {Extension} from '@roots/bud-framework'
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
 *
 * @public
 * @decorator `@label`
 * @decorator `@expose`
 * @decorator `@plugin`
 * @decorator `@options`
 */
@label(`@roots/bud-eslint`)
@expose(`eslint`)
@plugin(EslintPlugin)
@options<Options>({
  extensions: [`js`, `jsx`, `ts`, `tsx`, `vue`],
  cacheLocation: app => app.path(`@storage`, app.label, `cache`, `eslint`),
  fix: false,
  context: app => app.context.basedir,
  resolvePluginsRelativeTo: app => app.context.basedir,
  threads: false,
})
export default class BudEslint extends Extension<Options, EslintPlugin> {
  /**
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    const eslintPath = await this.resolve(`eslint`)
    this.setOption(`eslintPath`, eslintPath)

    const findFlatConfig = ({name}) => name.includes(`eslint.config`)

    const userConfigs = Object.values(this.app.context.config)
    if (!userConfigs.some(findFlatConfig)) return

    const flatConfig = userConfigs.find(findFlatConfig)
    this.setOption(`baseConfig`, flatConfig.module)
  }

  /**
   * auto-fix rule violations
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public fix(fix: boolean = true): this {
    this.setOption(`fix`, fix)
    return this
  }
}
