import type {ReactRefreshPluginOptions as Options} from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types'
import type {Bud} from '@roots/bud-framework/bud'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  dependsOnOptional,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import {isBoolean, isUndefined} from 'lodash-es'

/**
 * `BudReact` adds the `@babel/preset-react` preset to the babel configuration
 * and registers the `@roots/bud-react/react-refresh` extension
 *
 * @remarks
 * If `@roots/bud-esbuild` is registered, the babel preset registration is skipped
 *
 * @public
 * @decorator `@label`
 * @decorator `@dependsOn`
 */
@label('@roots/bud-react')
@dependsOn(['@roots/bud-react/react-refresh'])
@dependsOnOptional(['@roots/bud-esbuild', '@roots/bud-swc'])
@expose('react')
export default class BudReact extends Extension {
  /**
   * `register` callback
   *
   * @remarks
   * Registers the`@roots/bud-babel` extension if `@roots/bud-esbuild` is not
   * already registered.
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    if (
      this.app.extensions.has('@roots/bud-esbuild') ||
      this.app.extensions.has('@roots/bud-swc')
    )
      return

    const BudBabel = await this.import('@roots/bud-babel')
    await this.app.extensions.add(BudBabel)
  }

  /**
   * `boot` callback
   *
   * @remarks
   * Adds the `@babel/preset-react` preset to babel if `@roots/bud-esbuild` is not
   * registered and `@roots/bud-babel` is available.
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async boot() {
    if (
      this.app.extensions.has('@roots/bud-esbuild') ||
      this.app.extensions.has('@roots/bud-swc') ||
      !this.app.extensions.has('@roots/bud-babel')
    )
      return

    const Preset = await this.resolve('@babel/preset-react')
    this.app.babel.setPreset('@babel/preset-react', Preset)
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
  public refresh(userOptions?: Options | boolean): this {
    this.app.hooks.action(
      'event.config.after',
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

      userOptions === false
        ? bud.extensions.get('@roots/bud-react/react-refresh').disable()
        : bud.extensions.get('@roots/bud-react/react-refresh').enable()

      if (isUndefined(userOptions) || isBoolean(userOptions)) return

      bud.extensions
        .get('@roots/bud-react/react-refresh')
        .setOptions(userOptions)

      return this
    }
  }
}
