import {Extension} from '@roots/bud-framework/extension'
import {expose} from '@roots/bud-framework/extension/decorators/expose'
import {label} from '@roots/bud-framework/extension/decorators/label'
import {production} from '@roots/bud-framework/extension/decorators/production'
import {bind} from '@roots/bud-support/decorators/bind'
import type {BudMinimizeCSSPublicInterface} from '@roots/bud-terser/css-minimize'
import BudMinimizeCSS from '@roots/bud-terser/css-minimize'
import type {BudMinimizeJSPublicInterface} from '@roots/bud-terser/js-minimize'
import BudMinimizeJS from '@roots/bud-terser/js-minimize'

/**
 * Minimizer configuration
 */
@label(`@roots/bud-terser`)
@expose(`minify`)
@production
class BudMinimize extends Extension {
  /**
   * JS minimizer configuration
   */
  public js: BudMinimizeJSPublicInterface
  /**
   * CSS minimizer configuration
   */
  public css: BudMinimizeCSSPublicInterface

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register(bud) {
    this.js = new BudMinimizeJS(bud)
    this.css = new BudMinimizeCSS(bud)

    // @ts-ignore
    await this.js.register(bud)
    // @ts-ignore
    await this.css.register(bud)

    /**
     * @deprecated remove in bud 7
     */
    bud.set(`terser`, this.js)
    bud.set(`minimizeCss`, this.css)
  }

  /**
   * {@link Extension.buildBefore}
   */
  @bind
  public override async buildBefore(bud) {
    // @ts-ignore
    await this.js.buildBefore(bud)
    // @ts-ignore
    await this.css.buildBefore(bud)

    bud.hooks.on(`build.optimization.minimize`, () => true)
  }
}

export default BudMinimize
export type {BudMinimize}
