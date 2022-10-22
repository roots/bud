import {Extension} from '@roots/bud-framework/extension'
import {expose, label} from '@roots/bud-framework/extension/decorators'

import type Bud from '../../bud.js'

/**
 * Extension enabling ESM compilation output
 *
 * @public
 * @decorator `@label`
 * @decorator `@expose`
 */
@label(`esm`)
@expose(`esm`)
export default class Esm extends Extension {
  /**
   * `buildBefore` callback
   *
   * @public
   * @decorator `@bind`
   */
  public async buildBefore(app: Bud) {
    app.hooks.fromMap({
      'build.experiments': experiments => ({
        ...(experiments ?? {}),
        outputModule: true,
      }),
      'build.output.module': true,
    })

    app.context.manifest?.imports &&
      app.externals(app.context.manifest.imports)
  }

  /**
   * `when` callback
   *
   * @public
   * @decorator `@bind`
   */
  public async when() {
    return false
  }
}
