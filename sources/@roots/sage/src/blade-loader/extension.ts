import BladeLoaderPlugin from '@roots/blade-loader'
import {Extension} from '@roots/bud-framework/extension'
import {
  disabled,
  label,
  plugin,
} from '@roots/bud-framework/extension/decorators'

/**
 * Blade loader extension
 *
 * @decorator `@label`
 */
@label(`@roots/sage/blade-loader`)
@plugin(BladeLoaderPlugin)
@disabled
export class BladeLoaderExtension extends Extension {}
