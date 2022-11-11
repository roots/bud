import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'

@label(`@roots/bud-preset-wordpress`)
@dependsOn([
  `@roots/bud-preset-recommend`,
  `@roots/bud-wordpress-externals`,
  `@roots/bud-wordpress-dependencies`,
  `@roots/bud-wordpress-manifests`,
  `@roots/bud-react`,
])
@expose(`wordpress`)
export default class BudPresetWordPress extends Extension {
  /**
   * `configAfter` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async configAfter(bud: Bud) {
    if (bud.isProduction) return
    if (bud.hooks.filter(`dev.middleware.proxy.target`)) return
    if (!bud.env.has(`WP_HOME`) || !bud.env.isString(`WP_HOME`)) return

    try {
      const url = new URL(bud.env.get(`WP_HOME`))
      bud.proxy(url)
    } catch (e) {
      bud.warn(
        `@roots/bud-preset-wordpress: tried to set proxy based on value of WP_HOME but failed\n`,
        `WP_HOME is set as: ${bud.env.get(`WP_HOME`)}`,
        `\n`,
        `Please check your .env file and ensure that WP_HOME is a valid URL`,
        `or call bud.proxy in your configuration file`,
      )
    }
  }
}
