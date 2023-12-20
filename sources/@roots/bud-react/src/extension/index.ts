import type {Bud} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'
import merge from '@roots/bud-support/merge'

import type BudReactRefresh from '../react-refresh/index.js'

/**
 * React configuration
 */
@label(`@roots/bud-react`)
@expose(`react`)
export default class BudReact extends Extension {
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
   */
  @bind
  public override async boot(bud: Bud) {
    bud.provide(await this.resolve(`react`, import.meta.url), [`React`])

    await bud.extensions.add(`@roots/bud-react/react-refresh`)

    if (bud.swc) {
      bud.swc.setJsc(
        merge(bud.swc.jsc, {transform: {react: {runtime: `automatic`}}}),
      )
      bud.swc.setTransform((transform = {}) => ({
        react: {runtime: `automatic`, ...(transform.react ?? {})},
        ...transform,
      }))
    }

    if (bud.babel) {
      const babelPluginUrl = await this.resolve(
        `@babel/preset-react`,
        import.meta.url,
      ).catch(bud.catch)

      this.app.babel.setPreset(`@babel/preset-react`, babelPluginUrl)
    }
  }
}
