import type {Bud} from '@roots/bud-framework'
import type {Compilation, Compiler} from '@roots/bud-support/webpack'

import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'
import {urlToHttpOptions} from 'node:url'

/**
 * Acorn adapter
 *
 * @see {@link https://github.com/roots/acorn}
 */
@label(`@roots/sage/acorn`)
export default class Acorn extends Extension {
  /**
   * Writes hmr.json for use with {@link https://github.com/roots/acorn/}
   */
  @bind
  public addAcornHotManifest(
    compiler: Compiler,
    compilation: Compilation,
  ) {
    return () => {
      const data = {
        dev: urlToHttpOptions(this.app.root?.server?.publicUrl),
        proxy: urlToHttpOptions(this.app.root?.server?.publicProxyUrl),
        publicPath: this.app.publicPath().replace(/auto$/, ``),
      }

      const source = new compiler.webpack.sources.RawSource(
        JSON.stringify(data, null, 2),
      )

      compilation.emitAsset(`hmr.json`, source)
    }
  }

  @bind
  public override apply(compiler: Compiler) {
    if (!this.app.isDevelopment) return

    compiler.hooks.thisCompilation.tap(
      `@roots/sage/acorn`,
      compilation => {
        compilation.hooks.processAssets.tap(
          {
            name: `@roots/sage/acorn`,
            stage:
              compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
          },
          this.addAcornHotManifest(compiler, compilation),
        )
      },
    )
  }

  /**
   * {@link Extension.buildBefore}
   */
  @bind
  public override async buildBefore(bud: Bud) {
    bud.entrypoints.set(`publicPath`, ``)
    bud.manifest.set(`publicPath`, ``)
  }
}
