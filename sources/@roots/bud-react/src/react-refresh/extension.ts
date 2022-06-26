import RefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import type {ReactRefreshPluginOptions as Options} from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  development,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'

import * as reduceEntries from './reducers.js'

/**
 * Wrapper for `@pmmmwh/react-refresh-webpack-plugin`
 *
 * @remarks
 * Does not execute if `bud.mode` is not `development`
 *
 * @public
 * @decorator `@label`
 * @decorator `@plugin`
 * @decorator `@options`
 * @decorator `@development`
 */
@label('@roots/bud-react/react-refresh')
@plugin(RefreshPlugin)
@options({overlay: false})
@development
export default class BudReactRefresh extends Extension<
  Options,
  RefreshPlugin
> {
  /**
   * `beforeBuild` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async beforeBuild() {
    if (!this.app.isDevelopment) return
    this.app.hooks.on('build.entry', reduceEntries.add)

    if (
      this.app.extensions.has('@roots/bud-esbuild') ||
      this.app.extensions.has('@roots/bud-swc') ||
      (this.app.extensions.has('@roots/bud-typescript') &&
        !this.app.extensions.get('@roots/bud-typescript').options.babel)
    )
      return

    this.app.babel.setPlugin(
      'react-refresh/babel',
      await this.resolve('react-refresh/babel'),
    )
  }
}
