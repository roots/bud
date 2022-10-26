import {Extension} from '@roots/bud-framework/extension'
import {
  disabled,
  expose,
  label,
} from '@roots/bud-framework/extension/decorators'

import type Bud from '../../bud.js'

/**
 * Extension enabling ESM compilation output
 *
 * @public
 * @decorator `@label`
 * @decorator `@expose`
 * @decorator `@disabled`
 */
@label(`esm`)
@expose(`esm`)
@disabled
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
}
