import type {Bud} from '@roots/bud-framework'
import type {
  Compilation,
  Compiler,
  WebpackPluginInstance,
} from '@roots/bud-support/webpack'

import {urlToHttpOptions} from 'node:url'

import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'

/**
 * Acorn adapter
 *
 * @see {@link https://github.com/roots/acorn}
 */
@label(`@roots/sage/acorn`)
export default class Acorn
  extends Extension
  implements WebpackPluginInstance
{
  /**
   * Writes hmr.json for use with {@link https://github.com/roots/acorn/}
   */
  @bind
  public addAcornHotManifest(
    compiler: Compiler,
    compilation: Compilation,
  ) {
    const data: Record<string, any> = {
      publicPath: this.app.publicPath().replace(/auto$/, ``),
    }

    if (this.app.root?.server?.publicUrl)
      data.dev = urlToHttpOptions(this.app.root.server.publicUrl)
    if (this.app.root?.server?.publicProxyUrl)
      data.proxy = urlToHttpOptions(this.app.root.server.publicProxyUrl)

    return () => {
      const source = new compiler.webpack.sources.RawSource(
        JSON.stringify(data, null, 2),
      )

      compilation.emitAsset(`hmr.json`, source)
    }
  }

  /**
   * {@link WebpackPluginInstance.apply}
   */
  @bind
  public override apply(compiler: Compiler): boolean {
    if (!this.app.isDevelopment) return false

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

    return true
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
