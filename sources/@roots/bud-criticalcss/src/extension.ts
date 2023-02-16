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
 * Critical css configuration
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
   * {@link Extension.register}
   */
  @bind
  public override async register(bud: Bud) {
    bud.extractCss = extractCss.bind(bud)
  }

  /**
   * Whether to extract styles
   *
   * @deprecated use {@link BudCriticalCss.set} instead
   *
   * @example
   * ```js
   * bud.critical.set('extract', true)
   * ```
   */
  @bind
  public extract(extract: boolean = true) {
    this.set(`extract`, extract)
    return this
  }

  /**
   * Set source url
   *
   * @deprecated use {@link BudCriticalCss.set} instead
   *
   * @example
   * ```js
   * bud.critical.set('src', 'https://example.com')
   * ```
   */
  @bind
  public src(src: string) {
    this.set(`src`, src)
    return this
  }

  /**
   * Set markup to use as source
   *
   * @deprecated use {@link BudCriticalCss.set} instead
   *
   * @example
   * ```js
   * bud.critical.set('html', '<html>...</html>')
   * ```
   */
  @bind
  public html(html: string) {
    this.set(`html`, html)
    return this
  }

  /**
   * Set base path
   *
   * @deprecated use {@link BudCriticalCss.set} instead
   *
   * @example
   * ```js
   * bud.critical.set('base', 'https://example.com/')
   * ```
   */
  @bind
  public base(base: string) {
    this.set(`base`, base)
    return this
  }

  /**
   * Set browser width
   *
   * @deprecated use {@link BudCriticalCss.set} instead
   *
   * @example
   * ```js
   * bud.critical.set('width', 1920)
   * ```
   */
  @bind
  public width(width: number) {
    this.set(`width`, width)
    return this
  }

  /**
   * Set browser height
   *
   *
   * @deprecated use {@link BudCriticalCss.set} instead
   *
   * @example
   * ```js
   * bud.critical.set('height', 1080)
   * ```
   */
  @bind
  public height(height: number) {
    this.set(`height`, height)
    return this
  }

  /**
   * Ignore css
   *
   *
   * @deprecated use {@link BudCriticalCss.set} instead
   *
   * @example
   * ```js
   * bud.critical.set('ignore', ['@font-face'])
   * ```
   */
  @bind
  public ignore(ignore: Options['ignore']) {
    this.set(`ignore`, ignore)
    return this
  }

  /**
   * Set request options
   *
   * @deprecated use {@link BudCriticalCss.set} instead
   *
   * @example
   * ```js
   * bud.critical.set('request', {https: {rejectUnauthorized: false}})
   * ```
   */
  @bind
  public request(request: number) {
    this.set(`request`, request)
    return this
  }
}
