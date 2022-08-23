import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  dependsOnOptional,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import {isUndefined} from 'lodash-es'

import type BudReactRefresh from './react-refresh/index.js'

/**
 * `BudReact` adds the `@babel/preset-react` preset to the babel configuration
 * and registers the `@roots/bud-react/react-refresh` extension
 *
 * @remarks
 * If `@roots/bud-esbuild` or `@roots/bud-swc` is registered, the babel preset registration is skipped
 *
 * @public
 * @decorator `@label`
 * @decorator `@dependsOn`
 * @decorator `@dependsOnOptional`
 * @decorator `@options`
 * @decorator `@expose`
 */
@label(`@roots/bud-react`)
@dependsOn([`@roots/bud-react/react-refresh`])
@dependsOnOptional([`@roots/bud-esbuild`, `@roots/bud-swc`])
@options({babel: undefined})
@expose(`react`)
export default class BudReact extends Extension {
  /**
   * Use babel
   *
   * @readonly
   * @public
   */
  public get useBabel(): boolean {
    if (!isUndefined(this.options.babel)) return this.options.babel

    if (this.app.extensions.has(`@roots/bud-typescript`)) {
      return this.app.extensions.get(`@roots/bud-typescript`).options.babel
    }

    if (this.app.extensions.has(`@roots/bud-swc`)) return false

    return true
  }

  /**
   * Accessor for `@roots/bud-react/react-refresh`
   *
   * @readonly
   * @public
   */
  public get refresh(): BudReactRefresh {
    return this.app.extensions.get(`@roots/bud-react/react-refresh`)
  }

  /**
   * `configAfter` callback
   *
   * @remarks
   * Adds the `@babel/preset-react` preset to babel if `@roots/bud-esbuild` is not
   * registered and `@roots/bud-babel` is available.
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async configAfter() {
    if (!this.useBabel) return

    await this.ensureBabelIsLoaded()

    const Preset = await this.resolve(`@babel/preset-react`)
    this.app.babel.setPreset(`@babel/preset-react`, Preset)
  }

  /**
   * Ensure babel extension is loaded
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async ensureBabelIsLoaded() {
    if (this.app.extensions.has(`@roots/bud-babel`)) return
    await this.app.extensions.add(await this.import(`@roots/bud-babel`))
  }
}
