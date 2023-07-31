import {Extension} from '@roots/bud-framework/extension'
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
