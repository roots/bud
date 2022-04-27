// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Add stylelint support to Bud
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import {Extension} from '@roots/bud-framework'
import {
  bind,
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import StylelintWebpackPlugin, {Options} from 'stylelint-webpack-plugin'

declare module '@roots/bud-framework' {
  interface Bud {
    stylelint: BudStylelintWebpackPlugin
  }
  interface Modules {
    '@roots/bud-stylelint': BudStylelintWebpackPlugin
  }
}

@label('stylelint-webpack-plugin')
@plugin(StylelintWebpackPlugin)
@options({context: app => app.path('@src')})
@expose('stylelint')
export default class BudStylelintWebpackPlugin extends Extension<
  Options,
  StylelintWebpackPlugin
> {
  @bind
  public failOnError(fail: boolean = true): this {
    this.options.failOnError = fail
    return this
  }
  @bind
  public failOnWarning(fail: boolean = true): this {
    this.options.failOnWarning = fail
    return this
  }
}
