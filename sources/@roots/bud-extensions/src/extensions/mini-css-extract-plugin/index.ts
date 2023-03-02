import {join} from 'node:path'

import {Bud, Extension} from '@roots/bud-framework'
import {
  label,
  options,
  plugin,
  production,
} from '@roots/bud-framework/extension/decorators'
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
  filename: (app: Bud) => join(`css`, app.relPath(`@name.css`)),
})
@production
export default class MiniCssExtract extends Extension<Options, Plugin> {}
