import type {Options} from '@roots/entrypoints-webpack-plugin'

import {Extension} from '@roots/bud-framework/extension'
import {
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import {EntrypointsWebpackPlugin} from '@roots/entrypoints-webpack-plugin'

@label(`@roots/bud-entrypoints`)
@expose(`entrypoints`)
@options({emitHtml: false})
@plugin(EntrypointsWebpackPlugin)
export class BudEntrypoints extends Extension<
  Options,
  EntrypointsWebpackPlugin
> {}
