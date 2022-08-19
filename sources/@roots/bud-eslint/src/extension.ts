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
  cwd: app => app.path(),
  resolvePluginsRelativeTo: app => app.path(),
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
