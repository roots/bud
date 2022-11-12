import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {label} from '@roots/bud-framework/extension/decorators'

@label(`@roots/bud-sass/resolve-url`)
export class BudResolveUrl extends Extension {
  /**
   * `register` callback
   *
   * @public
   */
  public override async register(bud: Bud) {
    const loader = await this.resolve(`resolve-url-loader`)

    bud.build.setLoader(`resolveUrl`, loader)
    bud.build.setItem(`resolveUrl`, {
      loader: `resolveUrl`,
      options: ({path, hooks}) => ({
        root: path(`@src`),
        sourceMap: true,
      }),
    })
  }
}
