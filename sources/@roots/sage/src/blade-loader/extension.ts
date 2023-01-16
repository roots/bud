import BladeLoaderPlugin from '@roots/blade-loader'
import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'

/**
 * Blade loader extension
 *
 * @public
 * @decorator `@label`
 */
@label(`@roots/sage/blade-loader`)
export class BladeLoaderExtension extends Extension {
  /**
   * `make` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async make() {
    return new BladeLoaderPlugin({directory: `views`})
  }
}
