import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'
import * as fs from '@roots/bud-support/fs'
import stripAnsi from 'strip-ansi'

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
@label(`@roots/bud-cache/invalidate-cache`)
export default class InvalidateCacheExtension extends Extension {
  public get file(): string {
    return this.app.path(
      `@storage`,
      `${this.app.label}`,
      `${this.app.mode}.error.json`,
    )
  }

  /**
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind public async register() {
    const invalidate = await fs.pathExists(this.file)

    if (invalidate || this.app.context.args.flush) {
      await fs.remove(this.file)
      await fs.remove(this.app.path(`@storage`, this.app.label, `cache`))
    }

    this.app.hooks.action(`compiler.after`, async () => {
      this.app.compiler.instance.hooks.done.tap(
        this.label,
        async compiler => {
          if (!compiler.hasErrors()) return
          await fs.writeJson(this.file, {
            hash: compiler.hash,
            errors: compiler.stats.flatMap(stats =>
              stats
                .toString({preset: `errors-warnings`, colors: false})
                .split(/\n/)
                .map(stripAnsi),
            ),
          })
        },
      )
    })
  }
}
