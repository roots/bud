import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import StylelintWebpackPlugin, {Options} from 'stylelint-webpack-plugin'

/**
 * Bud stylelint extension
 *
 * @public
 * @decorator `@label`
 * @decorator `@plugin`
 * @decorator `@options`
 * @decorator `@expose`
 */
@label('@roots/bud-stylelint')
@plugin(StylelintWebpackPlugin)
@options<Options>({
  context: app => app.path('@src'),
  cache: true,
  cacheLocation: app => app.path('@storage/cache/stylelint'),
  emitError: false,
  emitWarning: false,
  formatter: 'string',
})
@expose('stylelint')
export default class BudStylelintWebpackPlugin extends Extension<
  Options,
  StylelintWebpackPlugin
> {
  /**
   * Fail build on stylelint error
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public failOnError(fail: boolean = true): this {
    this.options.failOnError = fail
    return this
  }

  /**
   * Fail build on stylelint warning
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public failOnWarning(fail: boolean = true): this {
    this.options.failOnWarning = fail
    return this
  }
}
