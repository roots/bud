import type {BudMinimizeCSSPublicInterface} from '@roots/bud-minify/minify-css'
import type {BudMinimizeJSPublicInterface} from '@roots/bud-minify/minify-js'

import {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {dependsOn} from '@roots/bud-framework/extension/decorators/dependsOn'
import {expose} from '@roots/bud-framework/extension/decorators/expose'
import {label} from '@roots/bud-framework/extension/decorators/label'
import {production} from '@roots/bud-framework/extension/decorators/production'
import {bind} from '@roots/bud-support/decorators/bind'

/**
 * Minimizer configuration
 */
@label(`@roots/bud-minify`)
@expose(`minimizers`)
@dependsOn([`@roots/bud-minify/minify-css`, `@roots/bud-minify/minify-js`])
@production
class BudMinimize extends Extension {
  /**
   * CSS minimizer configuration
   */
  public declare css: BudMinimizeCSSPublicInterface

  /**
   * JS minimizer configuration
   */
  public declare js: BudMinimizeJSPublicInterface

  /**
   * {@link Extension.buildBefore}
   */
  @bind
  public override async buildBefore(bud: Bud) {
    bud.hooks.on(`build.optimization.minimize`, this.enabled)
  }

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register(bud: Bud) {
    bud.set(`minify`, this, false)

    this.js = bud.extensions.get(
      `@roots/bud-minify/minify-js`,
    ) as BudMinimize[`js`]

    bud.set(
      `terser`,
      bud.extensions.get(
        `@roots/bud-minify/minify-js`,
      ) as BudMinimize[`js`],
    )

    this.css = bud.extensions.get(`@roots/bud-minify/minify-css`)
    bud.set(
      `minimizeCss`,
      bud.extensions.get(`@roots/bud-minify/minify-css`),
    )
  }

  @bind
  public override enable(value: boolean | Bud = true) {
    this.enabled = value instanceof Bud ? true : value
    this.logger.log(this.enabled ? `enabled` : `disabled`)

    this.app.hooks.on(`build.optimization.minimize`, this.enabled)

    return this
  }
}

export {BudMinimize as default, type BudMinimize}
