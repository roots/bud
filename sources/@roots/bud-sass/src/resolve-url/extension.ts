import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {label} from '@roots/bud-framework/extension/decorators'

@label(`@roots/bud-sass/resolve-url`)
export default class BudResolveUrl extends Extension {
  /**
   * `register` callback
   *
   * @public
   */
  public async register(app: Bud) {
    const loader = await this.resolve(`resolve-url-loader`)

    app.build.setLoader(`resolveUrl`, loader)
    app.build.setItem(`resolveUrl`, {
      loader: `resolveUrl`,
      options: ({path, hooks}) => ({
        root: path(`@src`),
        sourceMap: true,
      }),
    })
  }
}
