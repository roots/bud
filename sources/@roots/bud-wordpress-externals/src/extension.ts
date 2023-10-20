import {Extension, type Option} from '@roots/bud-framework/extension'
import {
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import WordPressExternals, {
  type Options,
} from '@roots/wordpress-externals-webpack-plugin'

@label(`@roots/bud-wordpress-externals`)
@plugin(WordPressExternals)
@options<Options>({
  exclude: [],
})
export default class BudWordPressExternals extends Extension<
  Options,
  WordPressExternals
> {
  /**
   * Excluded packages
   */
  public declare exclude: Option<
    BudWordPressExternals,
    Options,
    `exclude`
  >[`value`]
  /**
   * Get excluded packages
   *
   * @example
   * ```js
   * extension.getExclude()
   * ```
   */
  public declare getExclude: Option<
    BudWordPressExternals,
    Options,
    `exclude`
  >[`get`]
  /**
   * Set excluded packages
   *
   * @param exclude - Array or callback function that returns an array
   *
   * @example
   * ```js
   * extension.setExclude(['jquery'])
   * ```
   *
   * @example
   * ```js
   * extension.setExclude((exclude = []) => [...exclude, 'jquery'])
   * ```
   */
  public declare setExclude: Option<
    BudWordPressExternals,
    Options,
    `exclude`
  >[`set`]
}
