import type {Bud} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import merge from '@roots/bud-support/lodash/merge'

import type BudReactRefresh from '../react-refresh/index.js'

/**
 * React configuration
 */
@label(`@roots/bud-react`)
@dependsOn([`@roots/bud-react/react-refresh`])
@expose(`react`)
export default class BudReact extends Extension {
  /**
   * {@link Extension.configAfter}
   *
   */
  @bind
  public override async boot(bud: Bud) {
    if (
      ![this.useSWC, this.useTypeScript, this.useBabel].some(
        t => t === true,
      )
    ) {
      this.logger.warn(`No supported compiler found.`)
    }

    if (this.useSWC) {
      bud.swc.setJsc(
        merge(bud.swc.jsc, {transform: {react: {runtime: `automatic`}}}),
      )
    }

    if (this.useBabel) {
      this.app.babel.setPreset(
        `@babel/preset-react`,
        await this.resolve(`@babel/preset-react`, import.meta.url),
      )
    }
  }

  /**
   * Accessor for `@roots/bud-react/react-refresh`
   *
   * @readonly
   */
  public get refresh(): BudReactRefresh {
    return this.app.extensions.get(`@roots/bud-react/react-refresh`)
  }

  /**
   * Use babel
   *
   * @readonly
   */
  public get useBabel(): boolean {
    if (this.useTypeScript) return false
    if (this.useSWC) return false
    return this.app.extensions.has(`@roots/bud-babel`)
  }

  /**
   * Use SWC
   *
   * @readonly
   */
  public get useSWC(): boolean {
    return this.app.extensions.has(`@roots/bud-swc`)
  }

  /**
   * Use TypeScript
   *
   * @readonly
   */
  public get useTypeScript(): boolean {
    if (this.useSWC) return false

    if (this.app.extensions.has(`@roots/bud-typescript`)) {
      return !this.app.extensions.get(`@roots/bud-typescript`).get(`babel`)
    }

    return false
  }
}
