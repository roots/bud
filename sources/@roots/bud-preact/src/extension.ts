import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  label,
} from '@roots/bud-framework/extension/decorators'

/**
 * Preact support extension
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
@label(`@roots/bud-preact`)
@dependsOn([`@roots/bud-babel`])
export default class BudPreact extends Extension {
  /**
   * `configAfter` callback
   *
   * @remarks
   * Adds the `@babel/plugin-transform-react-jsx` preset to babel if:
   * - `@roots/bud-esbuild` is not registered
   * - `@roots/bud-swc` is not registered
   * - `@roots/bud-babel` is available.
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async configAfter() {
    const preset = await this.resolve(`@babel/plugin-transform-react-jsx`)

    this.app.babel.setPlugin(`@babel/plugin-transform-react-jsx`, [
      preset,
      {pragma: `h`, pragmaFrag: `Fragment`},
    ])

    this.app.hooks.async(`build.resolve.modules`, async modules => ({
      ...modules,
      react: `preact/compat`,
      'react-dom/test-utils': `preact/test-utils`,
      'react-dom': `preact/compat`,
      'react/jsx-runtime': `preact/jsx-runtime`,
    }))
  }
}
