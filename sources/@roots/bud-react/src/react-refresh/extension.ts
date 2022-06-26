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
  public transform?: Extension

  public setTransform(extension: Extension) {
    this.transform = extension
  }

  /**
   * `afterConfig` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async afterConfig() {
    this.app.hooks.on('build.entry', reduceEntries.add)

    if (!this.transform) {
      const useTSC =
        this.app.extensions.has('@roots/bud-typescript') &&
        !this.app.extensions.get('@roots/bud-typescript').options.babel

      this.setTransform(
        await this.import(
          useTSC
            ? '@roots/bud-react/typescript-refresh'
            : '@roots/bud-react/babel-refresh',
        ),
      )
    }

    await this.app.extensions.add(this.transform)
  }
}
