import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import StylelintPlugin from 'stylelint-webpack-plugin'

/**
 * Bud stylelint extension
 */
@label(`@roots/bud-stylelint`)
@plugin(StylelintPlugin)
@options<StylelintPlugin.Options>({context: app => app.path(`@src`)})
@expose(`stylelint`)
export default class BudStylelintWebpackPlugin extends Extension<
  StylelintPlugin.Options,
  StylelintPlugin
> {
  /**
   * Fail build on stylelint error
   */
  @bind
  public failOnError(fail: boolean = true): this {
    this.options.failOnError = fail
    return this
  }

  /**
   * Fail build on stylelint warning
   */
  @bind
  public failOnWarning(fail: boolean = true): this {
    this.options.failOnWarning = fail
    return this
  }
}
