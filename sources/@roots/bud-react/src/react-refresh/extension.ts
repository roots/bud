import RefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import type {ReactRefreshPluginOptions as Options} from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types'
import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  development,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import {isBoolean, isUndefined} from 'lodash-es'

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
   * Extension to handle transformer
   *
   * @public
   */
  public transformExtension?: Extension

  /**
   * Set extension to handle react-refresh code transforms
   *
   * @public
   */
  public setTransformExtension(extension: Extension) {
    this.transformExtension = extension
  }

  /**
   * `afterConfig` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async afterConfig() {
    this.logger.log('Injecting react-refresh/client scripts')
    this.app.hooks.on('build.entry', reduceEntries.add)

    if (!this.transformExtension) {
      this.setTransformExtension(
        await this.import(
          this.app.react.useBabel
            ? '@roots/bud-react/babel-refresh'
            : this.app.extensions.has('@roots/bud-swc')
            ? '@roots/bud-react/swc-refresh'
            : '@roots/bud-react/typescript-refresh',
        ),
      )
    }

    this.logger.log(
      'Registering transformer',
      this.transformExtension.label,
    )
    await this.app.extensions.add(this.transformExtension)
  }

  /**
   * Configure react-refresh-webpack-plugin
   *
   * @example
   * Add react-refresh-webpack-plugin
   *
   * ```ts
   * bud.react.refresh(true)
   * ```
   *
   * @example
   * Remove react-refresh-webpack-plugin
   *
   * ```ts
   * bud.react.refresh(false)
   * ```
   *
   * @example
   * Configure react-refresh-webpack-plugin
   *
   * ```ts
   * bud.react.refresh({
   *   overlay: true,
   * })
   * ```
   *
   * @remarks
   * Configuration takes place during the `event.config.after` event
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public configure(userOptions?: Options | boolean): this {
    this.app.hooks.action(
      'config.after',
      this.makeReactRefreshCallback(userOptions),
    )

    return this
  }

  /**
   * Callback handling react-refresh-webpack-plugin configuration
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  protected makeReactRefreshCallback(
    userOptions?: Options | boolean,
  ): (bud: Bud) => Promise<unknown> {
    return async (bud: Bud) => {
      if (!this.app.isDevelopment) return

      userOptions === false ? this.disable() : this.enable()

      if (isUndefined(userOptions) || isBoolean(userOptions)) return

      this.setOptions(userOptions)

      return this
    }
  }
}
