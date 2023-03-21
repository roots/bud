import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import isUndefined from '@roots/bud-support/lodash/isUndefined'

import type BudReactRefresh from '../react-refresh/index.js'

/**
 * React configuration
 */
@label(`@roots/bud-react`)
@dependsOn([`@roots/bud-react/react-refresh`])
@options({babel: undefined})
@expose(`react`)
export default class BudReact extends Extension {
  /**
   * Use babel
   *
   * @readonly
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
   */
  public get refresh(): BudReactRefresh {
    return this.app.extensions.get(
      `@roots/bud-react/react-refresh`,
    ) as BudReactRefresh
  }

  /**
   * {@link Extension.configAfter}
   *
   * @remarks
   * Adds the `@babel/preset-react` preset to babel if `@roots/bud-esbuild` is not
   * registered and `@roots/bud-babel` is available.
   */
  @bind
  public override async configAfter(bud: Bud) {
    if (!this.useBabel) return

    await this.ensureBabelIsLoaded()

    bud.babel.setPreset(
      `@babel/preset-react`,
      await this.resolve(`@babel/preset-react`, import.meta.url),
    )
  }

  /**
   * Ensure babel extension is loaded
   */
  @bind
  public async ensureBabelIsLoaded() {
    if (this.app.extensions.has(`@roots/bud-babel`)) return
    await this.app.extensions.add(
      await this.import(`@roots/bud-babel`, import.meta.url),
    )
  }
}
