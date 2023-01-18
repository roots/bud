import type {Bud} from '@roots/bud'
import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'

/**
 * Acorn v2 public path fix
 *
 * @public
 * @decorator `@label`
 */
@label(`@roots/sage/acorn-v2-public-path`)
export class AcornV2PublicPath extends Extension {
  /**
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async register(bud: Bud) {
    if (bud.isDevelopment) {
      bud.setPublicPath(`/`)
      this.logger.success(`set publicPath to / for dev`)
    }
  }
}
