import BladeLoaderPlugin from '@roots/blade-loader'
import type {Bud} from '@roots/bud'
import {Extension} from '@roots/bud-framework/extension'
import {label, plugin} from '@roots/bud-framework/extension/decorators'

/**
 * Blade loader extension
 *
 * @decorator `@label`
 */
@label(`@roots/sage/blade-loader`)
@plugin(BladeLoaderPlugin)
export class BladeLoaderExtension extends Extension {
  public override async register(bud: Bud) {
    bud.hooks.on(`build.resolve.extensions`, (extensions = new Set([])) =>
      extensions.add(`.blade.php`),
    )
  }
}
