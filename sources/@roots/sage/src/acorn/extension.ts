import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {label} from '@roots/bud-framework/extension/decorators'

import eventCompilerDone from './hooks/event.compiler.done.js'

/**
 * Acorn adapter
 */
@label(`@roots/sage/acorn`)
export default class Acorn extends Extension {
  /**
   * {@link Extension.register}
   */
  public override async register(bud: Bud) {
    bud.extensions.get(`@roots/bud-entrypoints`).set(`publicPath`, ``)

    bud.extensions
      .get(`@roots/bud-extensions/webpack-manifest-plugin`)
      .set(`publicPath`, ``)

    /**
     * Write hmr.json
     */
    if (bud.isDevelopment) {
      bud.hooks.action(`compiler.close`, eventCompilerDone)
    }
  }
}
