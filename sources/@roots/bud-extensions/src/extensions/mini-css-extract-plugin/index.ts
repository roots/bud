import type {Options} from '@roots/bud-support/mini-css-extract-plugin'

import {Extension} from '@roots/bud-framework/extension'
import {
  label,
  options,
  plugin,
  production,
} from '@roots/bud-framework/extension/decorators'
import {Plugin} from '@roots/bud-support/mini-css-extract-plugin'
import Value from '@roots/bud-support/value'

/**
 * Mini CSS Extract Plugin configuration
 */
@label(`@roots/bud-extensions/mini-css-extract-plugin`)
@plugin(Plugin)
@options<Options>({
  /**
   * css output filename
   */
  filename: Value.make(({relPath}) => relPath(`css`, `@name.css`)),
})
@production
export default class MiniCssExtract extends Extension<Options, Plugin> {}
