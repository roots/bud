import {Extension} from '@roots/bud-framework'
import {
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import type {Options} from '@roots/entrypoints-webpack-plugin'
import {EntrypointsWebpackPlugin} from '@roots/entrypoints-webpack-plugin'

@label(`@roots/bud-entrypoints`)
@expose(`entrypoints`)
@options({emitHtml: false})
@plugin(EntrypointsWebpackPlugin)
export class BudEntrypoints extends Extension<
  Options,
  EntrypointsWebpackPlugin
> {}
