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
   */
  @bind
  public override async configAfter(bud: Bud) {
    if (!this.useBabel) return

    await this.ensureBabelIsLoaded()

    const preset = await this.resolve(
      `@babel/preset-react`,
      import.meta.url,
    )
    if (!preset) throw new Error(`@babel/preset-react not found`)
    bud.babel.setPreset(`@babel/preset-react`, preset)
  }

  /**
   * Ensure babel extension is loaded
   */
  @bind
  public async ensureBabelIsLoaded() {
    if (this.app.extensions.has(`@roots/bud-babel`)) return
    const babel = await this.import(`@roots/bud-babel`, import.meta.url)
    if (!babel) throw new Error(`@roots/bud-babel not found`)

    await this.app.extensions.add(babel)
  }
}
