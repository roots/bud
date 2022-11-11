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

import {extractCss} from './api/extract.js'

/**
 * Adds critical css webpack plugin to compilation
 *
 * @example
 *
 * At minimum you will need to provide an html or src option:
 *
 * ```js
 *
 * ```
 *
 * More options:
 *
 * ```ts
 * bud.critical
 *   .src('https://example.test')
 *   .width(1200)
 *   .height(800)
 *   .request({https: {rejectUnauthorized: false}})
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
   * `register` callback
   */
  @bind
  public async register(bud: Bud) {
    bud.extractCss = extractCss.bind(bud)
  }

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

  /**
   * Ignore css
   *
   * @param ignore - css ignore matcher
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public ignore(ignore: Options['ignore']) {
    this.setOption(`ignore`, ignore)
    return this
  }

  /**
   * Set request options
   *
   * @param request - http request options
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public request(request: number) {
    this.setOption(`request`, request)
    return this
  }
}
