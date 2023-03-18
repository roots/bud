import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'
import {urlToHttpOptions} from 'url'

/**
 * Acorn adapter
 *
 * @see {@link https://github.com/roots/acorn}
 */
@label(`@roots/sage/acorn`)
export default class Acorn extends Extension {
  /**
   * {@link Extension.buildBefore}
   */
  @bind
  public override async buildBefore(bud: Bud) {
    bud.entrypoints.set(`publicPath`, ``)
    bud.manifest.set(`publicPath`, ``)

    bud.when(bud.isDevelopment, ({hooks}) =>
      hooks.action(`compiler.close`, this.writeHMR),
    )
  }

  /**
   * Write hmr.json
   */
  @bind
  public async writeHMR(bud: Bud) {
    await bud.fs.write(bud.path(`@dist`, `hmr.json`), {
      dev: urlToHttpOptions(bud.root.server.publicUrl),
      proxy: urlToHttpOptions(bud.root.server.publicProxyUrl),
      publicPath: bud.publicPath(),
    })
  }
}
