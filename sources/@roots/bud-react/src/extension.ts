import type {ReactRefreshPluginOptions as Options} from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types'
import type {Bud} from '@roots/bud-framework/bud'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  dependsOnOptional,
  expose,
  label,
  options,
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
 * @decorator `@dependsOnOptional`
 * @decorator `@options`
 * @decorator `@expose`
 */
@label('@roots/bud-react')
@dependsOn(['@roots/bud-react/react-refresh'])
@dependsOnOptional(['@roots/bud-esbuild', '@roots/bud-swc'])
@options({
  babel: true,
})
@expose('react')
export default class BudReact extends Extension {
  /**
   * `register` callback
   *
   * @remarks
   * Registers the`@roots/bud-babel` extension if
   * a more specialty transpiler is not already registered.
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async register() {
    if (
      this.app.extensions.has('@roots/bud-esbuild') ||
      this.app.extensions.has('@roots/bud-swc')
    ) {
      this.setOption('babel', false)
    }
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
  public async afterConfig() {
    if (!this.options.babel) return
    await this.ensureBabelIsLoaded()

    const Preset = await this.resolve('@babel/preset-react')
    this.app.babel.setPreset('@babel/preset-react', Preset)
  }

  /**
   * Ensure babel extension is loaded
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async ensureBabelIsLoaded() {
    if (this.app.extensions.has('@roots/bud-babel')) return
    await this.app.extensions.add(await this.import('@roots/bud-babel'))
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
