import type {Bud} from '@roots/bud'
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
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async register(bud: Bud) {
    bud.build
      .setLoader(`@roots/blade-loader`, await bud.module.resolve(`@roots/blade-loader`))
      .setItem(`no-emit`, {loader: `file`, options: {emit: false}})
      .setItem(`@roots/blade-loader`, {loader: `@roots/blade-loader`})
      .setRule(`blade`, {
        test: /\.blade\.php$/,
        use: [`no-emit`, `@roots/blade-loader`],
      })
  }
}
