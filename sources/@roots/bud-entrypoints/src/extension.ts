import type {Bud} from '@roots/bud-framework'
import type {Options} from '@roots/entrypoints-webpack-plugin'

import {DynamicOption, Extension} from '@roots/bud-framework/extension'
import {
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import {EntrypointsWebpackPlugin} from '@roots/entrypoints-webpack-plugin'

@label(`@roots/bud-entrypoints`)
@expose(`entrypoints`)
@options({
  emitHtml: false,
  publicPath: DynamicOption.make((bud: Bud) => bud.publicPath()),
  type: `object`,
})
@plugin(EntrypointsWebpackPlugin)
export class BudEntrypoints extends Extension<
  Options,
  EntrypointsWebpackPlugin
> {}
