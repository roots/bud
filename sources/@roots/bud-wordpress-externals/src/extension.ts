import {Extension} from '@roots/bud-framework/extension'
import {
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import WordPressExternals from '@roots/wordpress-externals-webpack-plugin'

@label(`@roots/bud-wordpress-externals`)
@plugin(WordPressExternals)
@options({
  exclude: [],
})
export default class BudWordPressExternals extends Extension<
  null,
  WordPressExternals
> {
  /**
   * Set excluded packages
   *
   * @param exclude - Array of packages to exclude
   *
   * @example
   * ```js
   * externalsExtension.setExclude(['jquery'])
   * ```
   */
  public declare setExclude: (exclude: Array<string>) => this
}
