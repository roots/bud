import {Extension} from '@roots/bud-framework/extension'
import {
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import Value from '@roots/bud-framework/value'
import {deprecated} from '@roots/bud-support/decorators'
import StylelintPlugin from 'stylelint-webpack-plugin'

/**
 * Bud stylelint extension
 */
@label(`@roots/bud-stylelint`)
@expose(`stylelint`)
@plugin(StylelintPlugin)
@options<StylelintPlugin.Options>({
  context: new Value(({path}) => path(`@src`)),
})
export default class BudStylelintWebpackPlugin extends Extension<
  StylelintPlugin.Options,
  StylelintPlugin
> {
  /**
   * Fail build on stylelint error
   *
   * @deprecated Use {@link Extension.set} instead
   *
   * @example
   * ```js
   * bud.stylelint.set(`failOnError`, true)
   * ```
   */
  @deprecated(`bud.stylelint`, `use bud.stylelint.set instead`, [
    [`Fail on error`, `bud.stylelint.set(\`failOnError\`, true)`],
  ])
  public failOnError(fail: boolean = true): this {
    this.set(`failOnError`, fail)
    return this
  }

  /**
   * Fail build on stylelint warning
   *
   * @deprecated Use {@link Extension.set} instead
   *
   * @example
   * ```js
   * bud.stylelint.set(`failOnWarning`, true)
   * ```
   */
  @deprecated(`bud.stylelint`, `use bud.stylelint.set instead`, [
    [`Fail on warning`, `bud.stylelint.set(\`failOnWarning\`, true)`],
  ])
  public failOnWarning(fail: boolean = true): this {
    this.set(`failOnWarning`, fail)
    return this
  }
}
