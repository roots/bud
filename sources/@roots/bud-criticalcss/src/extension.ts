import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  disabled,
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import CriticalCssWebpackPlugin, {
  Options,
} from '@roots/critical-css-webpack-plugin'

/**
 * Adds critical css webpack plugin to compilation
 *
 * @example
 * ```ts
 * bud.critical
 *   .src('https://example.test')
 *   .width(1200)
 *   .height(800)
 *   .extract()
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
  extract: true,
  request: {https: {rejectUnauthorized: false}},
})
@disabled
export default class BudCriticalCss extends Extension<
  Options,
  CriticalCssWebpackPlugin
> {
  /**
   * Whether to extract styles
   *
   * @param extract - extract styles
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public extract(extract: boolean = true) {
    this.setOption(`extract`, extract)
    return this
  }

  /**
   * Set source url
   *
   * @param src - source url
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public src(src: string) {
    this.setOption(`src`, src)
    return this
  }

  /**
   * Set markup to use as source
   *
   * @param html - source template as a string
   *
   * @public
   * @decorator `@bind`
   */
  @bind
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
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public base(base: string) {
    this.setOption(`base`, base)
    return this
  }

  /**
   * Set browser width
   *
   * @param width - browser width
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public width(width: number) {
    this.setOption(`width`, width)
    return this
  }

  /**
   * Set browser height
   *
   * @param height - browser height
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public height(height: number) {
    this.setOption(`height`, height)
    return this
  }
}
