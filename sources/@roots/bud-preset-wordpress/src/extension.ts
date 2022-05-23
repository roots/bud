import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
  options,
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
@options({replaceLink: true})
@expose('wordpress')
export default class BudPresetWordPress extends Extension {
  protected _origin: URL

  public get origin(): URL {
    return this._origin
  }
  public set origin(origin: string | URL) {
    this._origin = origin instanceof URL ? origin : new URL(origin)
  }

  @bind
  public async init() {
    if (!this.app.env.has('WP_HOME') || !this.app.env.isString('WP_HOME'))
      return
    this.origin = this.app.env.get('WP_HOME')
  }

  @bind
  public async register() {
    if (!this.origin) return

    try {
      this.proxyOrigin(this.origin)
    } catch (err) {
      this.logger.warn(
        `Tried to set proxy based on value of WP_HOME but failed\n`,
        `WP_HOME is set as: ${this.origin}`,
        `\n`,
        err,
      )
    }
  }

  @bind
  public proxyOrigin(origin: string | URL): this {
    this.origin = origin

    this.app.proxy(this.origin)

    return this
  }
}
