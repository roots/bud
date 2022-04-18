import {Extension} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'

/**
 * @public
 */
export class WordPress extends Extension.Extension {
  /**
   * @public
   */
  public label = '@roots/bud-wordpress'

  /**
   * @public
   */
  public get origin() {
    return this.app.env.has('WP_HOME') && this.app.env.isString('WP_HOME')
      ? new URL(this.app.env.get('WP_HOME'))
      : null
  }

  /**
   * @public
   */
  @bind
  public async boot() {
    if (!this.origin) return

    try {
      this.app.proxy(this.origin)
    } catch (err) {
      this.logger.warn(
        `\n`,
        `Tried to set proxy based on value of WP_HOME but failed\n`,
        `WP_HOME is set as: ${this.origin}`,
        `\n`,
        err,
      )
    }
  }
}
