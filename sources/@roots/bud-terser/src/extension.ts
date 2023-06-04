import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  expose,
  label,
  production,
} from '@roots/bud-framework/extension/decorators'

import type {BudMinimizeCSSPublicInterface} from './css-minimize/index.js'
import BudMinimizeCSS from './css-minimize/index.js'
import type {BudMinimizeJSPublicInterface} from './js-minimize/index.js'
import BudMinimizeJS from './js-minimize/index.js'

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
  public override async register(bud: Bud) {
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
  public override async buildBefore(bud: Bud) {
    // @ts-ignore
    await this.js.buildBefore(bud)
    // @ts-ignore
    await this.css.buildBefore(bud)

    bud.hooks.on(`build.optimization.minimize`, () => true)
  }
}

export default BudMinimize
export type {BudMinimize}
