import type {Bud} from '@roots/bud-framework'

import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'

/**
 * resolve-url-loader configuration
 */
@label(`@roots/bud-sass/resolve-url`)
export class BudResolveUrl extends Extension {
  /**
   * {@link Extension.register}
   */
  @bind
  public override async register({build, hooks}: Bud) {
    /** Source loader */
    const loader = await this.resolve(
      `resolve-url-loader`,
      import.meta.url,
    )

    if (!loader) return this.logger.error(`resolve-url-loader not found`)

    /** Set loader alias */
    hooks.on(`build.resolveLoader.alias`, (aliases = {}) => ({
      ...aliases,
      [`resolve-url-loader`]: loader,
    }))

    /** Setup rule */
    build.setLoader(`resolve-url`, loader).setItem(`resolve-url`, {
      loader: `resolve-url`,
      options: ({path}: Bud) => ({root: path(`@src`), sourceMap: true}),
    })
  }
}
