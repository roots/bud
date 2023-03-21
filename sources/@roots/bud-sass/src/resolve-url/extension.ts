import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {label} from '@roots/bud-framework/extension/decorators'

/**
 * resolve-url-loader configuration
 */
@label(`@roots/bud-sass/resolve-url`)
export class BudResolveUrl extends Extension {
  /**
   * {@link Extension.register}
   */
  public override async register(bud: Bud) {
    bud.build
      .setLoader(
        `resolveUrl`,
        await this.resolve(`resolve-url-loader`, import.meta.url),
      )
      .setItem(`resolveUrl`, {
        loader: `resolveUrl`,
        options: ({path}) => ({root: path(`@src`), sourceMap: true}),
      })
  }
}
