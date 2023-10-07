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
   * Compiler
   */
  public get compiler(): `babel` | `swc` | `typescript` | false {
    if (this.app.extensions.has(`@roots/bud-swc`)) return `swc`
    if (
      this.app.extensions.has(`@roots/bud-typescript`) &&
      !this.app.extensions.get(`@roots/bud-typescript`).get(`babel`)
    )
      return `typescript`
    if (this.app.extensions.has(`@roots/bud-babel`)) return `babel`

    return false
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
   * {@link Extension.configAfter}
   *
   */
  @bind
  public override async boot(bud: Bud) {
    bud.provide(await this.resolve(`react`, import.meta.url), [`React`])

    if (this.compiler === false) {
      this.logger.warn(`No supported compiler found.`)
    }

    if (this.compiler === `swc`) {
      bud.swc.setJsc(
        merge(bud.swc.jsc, {transform: {react: {runtime: `automatic`}}}),
      )
    }

    if (this.compiler === `babel`) {
      const babelPluginUrl = await this.resolve(
        `@babel/preset-react`,
        import.meta.url,
      ).catch(bud.catch)
      this.app.babel.setPreset(`@babel/preset-react`, babelPluginUrl)
    }
  }
}
