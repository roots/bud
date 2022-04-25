import {Extension} from '@roots/bud-framework'
import {WordPressExternals} from '@roots/wordpress-externals-webpack-plugin'

/**
 * @public
 */
class BudWordPressExternals extends Extension {
  public label: '@roots/wordpress-externals-webpack-plugin'

  public async make() {
    return new WordPressExternals()
  }
}

export default BudWordPressExternals
