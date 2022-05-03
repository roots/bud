import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  label,
} from '@roots/bud-framework/extension/decorators'

@label('@roots/bud-preset-wordpress')
@dependsOn([
  '@roots/bud-entrypoints',
  '@roots/bud-preset-recommend',
  '@roots/bud-react',
  '@roots/bud-wordpress-externals',
  '@roots/bud-wordpress-dependencies',
  '@roots/bud-wordpress-manifests',
])
export default class BudPresetWordPress extends Extension {
  public get origin() {
    return this.app.env.has('WP_HOME') && this.app.env.isString('WP_HOME')
      ? new URL(this.app.env.get('WP_HOME'))
      : null
  }

  @bind
  public async boot() {
    if (!this.origin) return

    try {
      this.app.proxy(this.origin)
    } catch (err) {
      this.logger.warn(
        `Tried to set proxy based on value of WP_HOME but failed\n`,
        `WP_HOME is set as: ${this.origin}`,
        `\n`,
        err,
      )
    }
  }
}
