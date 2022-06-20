import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'
import fs from 'fs-extra'

/**
 * Cache invalidation extension
 *
 * @remarks
 * Certain webpack components such as `eslint-webpack-plugin` and
 * `ts-loader` have issues with fs caching. This extension writes a file
 * to the cache directory which is used to invalidate the cache before
 * webpack is invoked on subsequent builds
 *
 * @public
 * @decorator `@label`
 */
@label('@roots/bud-cache/invalidate-cache')
export default class InvalidateCacheExtension extends Extension {
  /**
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind public async register() {
    const invalidate = await fs.pathExists(
      this.app.path(`@storage/cache/invalidate`),
    )
    if (this.app.context.args.flush === true || invalidate) {
      await fs.remove(this.app.path(`@storage/cache`))
    }

    this.app.hooks.action('event.compiler.after', async () => {
      this.app.compiler.compilation.hooks.done.tap(
        this.label,
        async compiler => {
          if (!compiler.hasErrors()) return
          await fs.ensureFile(this.app.path(`@storage/cache/invalidate`))
        },
      )
    })
  }
}
