import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  expose,
  label,
  options,
  plugin,
  when,
} from '@roots/bud-framework/extension/decorators'
import CriticalCssWebpackPlugin, {
  Options,
} from '@roots/critical-css-webpack-plugin'

/**
 * Adds critical css webpack plugin to compilation
 *
 * @example
 * Configure plugin options:
 *
 * ```ts
 * bud.critical.setOptions({
 *  src: 'https://example.test',
 * })
 * ```
 *
 * @example
 * Enable conditionally for production:
 *
 * ```ts
 * bud.when(bud.isProduction, bud.critical.enable)
 * ```
 *
 * @public
 * @decorator `@label`
 * @decorator `@expose`
 * @decorator `@plugin`
 * @decorator `@options`
 * @decorator `@when`
 */
@label(`@roots/bud-criticalcss`)
@expose(`critical`)
@plugin(CriticalCssWebpackPlugin)
@options<Options>({
  base: (app: Bud) => app.publicPath() ?? `/`,
  request: {https: {rejectUnauthorized: false}},
})
@when(async () => false)
export default class BudCriticalCss extends Extension<
  Options,
  CriticalCssWebpackPlugin
> {}
