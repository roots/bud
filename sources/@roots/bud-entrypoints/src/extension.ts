import {Extension} from '@roots/bud-framework'
import {
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import type {Options} from '@roots/entrypoints-webpack-plugin'
import {EntrypointsWebpackPlugin} from '@roots/entrypoints-webpack-plugin'

@label(`@roots/bud-entrypoints`)
@options({emitHtml: false})
@plugin(EntrypointsWebpackPlugin)
export default class BudEntrypoints extends Extension<
  Options,
  EntrypointsWebpackPlugin
> {}
