import BladeLoaderPlugin from '@roots/blade-loader'
import type {Bud} from '@roots/bud'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  disabled,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'

interface Options {
  templates: string | Array<string>
}

/**
 * Blade loader extension
 *
 * @decorator `@label`
 */
@label(`@roots/sage/blade-loader`)
@options({
  templates: bud => bud.path(`@src`, `views`, `**/*.blade.php`),
})
@disabled
export class BladeLoaderExtension extends Extension<Options> {
  /**
   * `make` callback
   *
   * @decorator `@bind`
   */
  @bind
  public override async make(bud: Bud, options: typeof this.options) {
    return new BladeLoaderPlugin(options)
  }
}
