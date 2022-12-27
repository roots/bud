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
 * `mini-css-extract-plugin` adapter
 *
 * @public
 * @decorator `@label`
 * @decorator `@plugin`
 * @decorator `@options`
 * @decorator `@production`
 */
@label(`@roots/bud-extensions/mini-css-extract-plugin`)
@plugin(Plugin)
@options({
  /**
   * css output filename
   *
   * @param app - Bud
   * @returns filename
   *
   * @public
   */
  filename: (app: Bud) => join(`css`, app.path(`@name`).concat(`.css`)),
})
@production
export default class MiniCssExtract extends Extension<Options, Plugin> {}
