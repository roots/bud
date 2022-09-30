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
  public async configAfter() {
    if (!this.app.isDevelopment) return

    if (this.app.api.trace.some(([method]) => method === `proxy`)) return
    if (this.app.hooks.filter(`dev.middleware.proxy.target`)) return

    if (!this.app.env.has(`WP_HOME`) || !this.app.env.isString(`WP_HOME`))
      return

    try {
      const url = new URL(this.app.env.get(`WP_HOME`))
      this.app.proxy(url)
    } catch (e) {
      this.app.warn(
        `@roots/bud-preset-wordpress: tried to set proxy based on value of WP_HOME but failed\n`,
        `WP_HOME is set as: ${this.app.env.get(`WP_HOME`)}`,
        `\n`,
        `Please check your .env file and ensure that WP_HOME is a valid URL`,
        `or call bud.proxy in your configuration file`,
      )
    }
  }
}
