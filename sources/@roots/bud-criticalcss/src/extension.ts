import type {Bud} from '@roots/bud-framework'
import type {Options} from '@roots/critical-css-webpack-plugin'

import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  disabled,
  expose,
  label,
  options,
  plugin,
} from '@roots/bud-framework/extension/decorators'
import {deprecated} from '@roots/bud-support/decorators'
import Value from '@roots/bud-support/value'
import CriticalCssWebpackPlugin from '@roots/critical-css-webpack-plugin'

import {extractCss} from './api/extract.js'

/**
 * Critical css configuration
 */
@label(`@roots/bud-criticalcss`)
@expose(`critical`)
@plugin(CriticalCssWebpackPlugin)
@options<Options>({
  base: Value.make(({publicPath}) =>
    publicPath() !== `auto` && publicPath() !== `` ? publicPath() : `/`,
  ),
  extract: true,
  request: {https: {rejectUnauthorized: false}},
})
@disabled
export default class BudCriticalCss extends Extension<
  Options,
  CriticalCssWebpackPlugin
> {
  /**
   * Set base path
   *
   * @deprecated Use {@link BudCriticalCss.set} instead
   *
   * @example
   * ```js
   * bud.critical.set('base', 'https://example.com/')
   * ```
   */
  @deprecated(`bud.critical`, `Use bud.critical.set instead`, [
    [`Set base`, `bud.critical.set('base', 'https://example.com/')`],
  ])
  public base(base: string) {
    this.set(`base`, base)
    return this
  }

  /**
   * Whether to extract styles
   *
   * @deprecated Use {@link BudCriticalCss.set} instead
   *
   * @example
   * ```js
   * bud.critical.set('extract', true)
   * ```
   */
  @deprecated(`bud.critical`, `Use bud.critical.set instead`, [
    [`Enable extract`, `bud.critical.set('extract', true)`],
    [`Disable extract`, `bud.critical.set('extract', false)`],
  ])
  public extract(extract: boolean = true) {
    this.set(`extract`, extract)
    return this
  }

  /**
   * Set browser height
   *
   * @deprecated Use {@link BudCriticalCss.set} instead
   *
   * @example
   * ```js
   * bud.critical.set('height', 1080)
   * ```
   */
  @deprecated(`bud.critical`, `Use bud.critical.set instead`, [
    [`Set height`, `bud.critical.set('height', 1080)`],
  ])
  public height(height: number) {
    this.set(`height`, height)
    return this
  }

  /**
   * Set markup to use as source
   *
   * @deprecated Use {@link BudCriticalCss.set} instead
   *
   * @example
   * ```js
   * bud.critical.set('html', '<html>...</html>')
   * ```
   */
  @deprecated(`bud.critical`, `Use bud.critical.set instead`, [
    [`Set html`, `bud.critical.set('html', '<html>...</html>')`],
  ])
  public html(html: string) {
    this.set(`html`, html)
    return this
  }

  /**
   * Ignore css
   *
   * @deprecated Use {@link BudCriticalCss.set} instead
   *
   * @example
   * ```js
   * bud.critical.set('ignore', ['@font-face'])
   * ```
   */
  @deprecated(`bud.critical`, `Use bud.critical.set instead`, [
    [`Set ignore`, `bud.critical.set('ignore', ['@font-face'])`],
  ])
  public ignore(ignore: Options['ignore']) {
    this.set(`ignore`, ignore)
    return this
  }

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register(bud: Bud) {
    bud.extractCss = extractCss.bind(bud)

    this.extract = this.extract.bind(this)
    this.src = this.src.bind(this)
    this.html = this.html.bind(this)
    this.base = this.base.bind(this)
    this.width = this.width.bind(this)
    this.height = this.height.bind(this)
    this.ignore = this.ignore.bind(this)
    this.request = this.request.bind(this)
  }

  /**
   * Set request options
   *
   * @deprecated Use {@link BudCriticalCss.set} instead
   *
   * @example
   * ```js
   * bud.critical.set('request', {https: {rejectUnauthorized: false}})
   * ```
   */
  @deprecated(`bud.critical`, `Use bud.critical.set instead`, [
    [
      `Set request options`,
      `bud.critical.set('request', {https: {rejectUnauthorized: false}})`,
    ],
  ])
  public request(request: number) {
    this.set(`request`, request)
    return this
  }

  /**
   * Set source url
   *
   * @deprecated Use {@link BudCriticalCss.set} instead
   *
   * @example
   * ```js
   * bud.critical.set('src', 'https://example.com')
   * ```
   */
  @deprecated(`bud.critical`, `Use bud.critical.set instead`, [
    [`Set src`, `bud.critical.set('src', 'https://example.com')`],
  ])
  public src(src: string) {
    this.set(`src`, src)
    return this
  }

  /**
   * Set browser width
   *
   * @deprecated Use {@link BudCriticalCss.set} instead
   *
   * @example
   * ```js
   * bud.critical.set('width', 1920)
   * ```
   */
  @deprecated(`bud.critical`, `Use bud.critical.set instead`, [
    [`Set width`, `bud.critical.set('width', 1920)`],
  ])
  public width(width: number) {
    this.set(`width`, width)
    return this
  }
}
