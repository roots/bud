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
 *
 * ```ts
 * bud.critical
 *   .setSrc('https://example.test')
 *   .setWidth(1200)
 *   .setHeight(800)
 *   .enable()
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
  base: (app: Bud) =>
    app.publicPath() !== `auto` && app.publicPath() !== ``
      ? app.publicPath()
      : `/`,
  request: {https: {rejectUnauthorized: false}},
})
@when(async () => false)
export default class BudCriticalCss extends Extension<
  Options,
  CriticalCssWebpackPlugin
> {
  /**
   * Set source url
   *
   * @param src - source url
   * @returns {@link BudCriticalCss}
   *
   * @public
   */
  public src(src: string) {
    this.setOption(`src`, src)
    return this
  }

  /**
   * Set markup to use as source
   *
   * @param html - source template as a string
   * @returns {@link BudCriticalCss}
   *
   * @public
   */
  public html(html: string) {
    this.setOption(`html`, html)
    return this
  }

  /**
   * Set base path
   *
   * @remarks
   * By default the base path is the public path.
   * Relative public paths are not supported.
   *
   * @param base - base path
   * @returns
   */
  public base(base: string) {
    this.setOption(`base`, base)
    return this
  }

  /**
   * Set browser width
   *
   * @param width - browser width
   * @returns {@link BudCriticalCss}
   *
   * @public
   */
  public width(width: number) {
    this.setOption(`width`, width)
    return this
  }

  /**
   * Set browser height
   *
   * @param height - browser height
   * @returns {@link BudCriticalCss}
   *
   * @public
   */
  public height(height: number) {
    this.setOption(`height`, height)
    return this
  }
}
