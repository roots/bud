import type {Bud} from '@roots/bud-framework'

import BladeLoaderPlugin from '@roots/blade-loader'
import {Extension} from '@roots/bud-framework/extension'
import {label, plugin} from '@roots/bud-framework/extension/decorators'

/**
 * Blade loader extension
 */
@label(`@roots/sage/blade-loader`)
@plugin(BladeLoaderPlugin)
export class BladeLoaderExtension extends Extension {
  /**
   * {@link Extension.register}
   */
  public override async register({hooks}: Bud) {
    hooks.on(`build.resolve.extensions`, (extensions = new Set([])) =>
      extensions.add(`.blade.php`),
    )
  }
}
