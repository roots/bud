import {join} from 'node:path'

import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  label,
  options,
  plugin,
  production,
} from '@roots/bud-framework/extension/decorators'
import Value from '@roots/bud-framework/value'
import type {Options} from '@roots/bud-support/mini-css-extract-plugin'
import {Plugin} from '@roots/bud-support/mini-css-extract-plugin'

/**
 * Mini CSS Extract Plugin configuration
 */
@label(`@roots/bud-extensions/mini-css-extract-plugin`)
@plugin(Plugin)
@options<Options>({
  /**
   * css output filename
   */
  filename: new Value((app: Bud) => join(`css`, app.relPath(`@name.css`))),
})
@production
export default class MiniCssExtract extends Extension<Options, Plugin> {}
