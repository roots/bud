import {join} from 'node:path'

import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'
import stripAnsi from 'strip-ansi'

/**
 * Cache invalidation extension
 *
 * @remarks
 * Certain webpack components such as `eslint-webpack-plugin` and
 * `ts-loader` have issues with fs caching. This extension writes a file
 * to the cache directory which is used to invalidate the cache before
 * webpack is invoked on subsequent builds
 */
@label(`@roots/bud-cache/invalidate-cache`)
export default class InvalidateCacheExtension extends Extension {
  /**
   * Invalidation file path
   */
  public get invalidationFile(): string {
    return join(this.app.cache.cacheDirectory, `error.json`)
  }

  /**
   * {@link Extension.register}
   */
  @bind
  public override async register(bud: Bud) {
    const invalidate = await bud.fs?.exists(this.invalidationFile)

    if (invalidate || (bud.isCLI() && bud.context.args.force)) {
      await bud.fs.remove(this.invalidationFile)
      await bud.fs.remove(bud.cache.cacheDirectory)
    }

    bud.after(async () => {
      bud.compiler.instance.hooks.done.tap(this.label, async compiler => {
        try {
          if (!compiler.hasErrors()) return

          await bud.fs.json.write(this.invalidationFile, {
            hash: compiler.hash,
            errors: compiler.stats.flatMap(stats =>
              stats
                .toString({preset: `errors-warnings`, colors: false})
                .split(/\n/)
                .map(stripAnsi),
            ),
          })
        } catch (e) {}
      })
    })
  }
}
