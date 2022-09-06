import {Extension} from '@roots/bud-framework/extension'
import {label, plugin} from '@roots/bud-framework/extension/decorators'
import WordPressExternals from '@roots/wordpress-externals-webpack-plugin'

@label(`@roots/bud-wordpress-externals`)
@plugin(WordPressExternals)
export default class BudWordPressExternals extends Extension<
  null,
  WordPressExternals
> {}
