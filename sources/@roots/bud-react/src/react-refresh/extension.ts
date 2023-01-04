import RefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import type {ReactRefreshPluginOptions as Options} from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types.js'
import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  disabled,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import isBoolean from '@roots/bud-support/lodash/isBoolean'
import isUndefined from '@roots/bud-support/lodash/isUndefined'

/**
 * Wrapper for `@pmmmwh/react-refresh-webpack-plugin`
 *
 * @remarks
 * Disabled by default
 *
 * @public
 * @decorator `@label`
 * @decorator `@plugin`
 * @decorator `@options`
 * @decorator `@disabled`
 */
@label(`@roots/bud-react/react-refresh`)
@plugin(RefreshPlugin)
@options({overlay: false})
@disabled
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
   * `configAfter` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async configAfter(bud: Bud) {
    this.logger.log(`Injecting react-refresh/client scripts`)
    if (!bud.hasChildren)
      bud.hooks.on(`dev.client.scripts`, scripts =>
        scripts
          ? scripts.add(() => `react-refresh/runtime`)
          : new Set([() => `react-refresh/runtime`]),
      )
    else
      Object.values(bud.children).forEach(instance =>
        instance.hooks.on(`dev.client.scripts`, scripts =>
          scripts
            ? scripts.add(() => `react-refresh/runtime`)
            : new Set([() => `react-refresh/runtime`]),
        ),
      )

    if (!this.transformExtension) {
      const signifier = bud.react.useBabel
        ? `@roots/bud-react/babel-refresh`
        : bud.extensions.has(`@roots/bud-swc`)
        ? `@roots/bud-react/swc-refresh`
        : `@roots/bud-react/typescript-refresh`

      await bud.extensions.add(signifier)
      this.setTransformExtension(bud.extensions.get(signifier))
    }

    this.logger.log(
      `Registering transformer`,
      this.transformExtension.label,
    )
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
   * Configuration takes place during the `config.after` event
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public configure(userOptions?: Options | boolean): this {
    this.app.hooks.action(
      `config.after`,
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
    return async () => {
      if (!this.app.isDevelopment) return

      userOptions === false ? this.disable() : this.enable()

      if (isUndefined(userOptions) || isBoolean(userOptions)) return

      this.setOptions(userOptions)

      return this
    }
  }
}
