import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'

import eventCompilerDone from './hooks/event.compiler.done.js'

/**
 * Acorn adapter
 */
@label(`@roots/sage/acorn`)
export default class Acorn extends Extension {
  /**
   * `register` callback
   */
  @bind
  public override async register(bud: Bud) {
    bud.extensions
      .get(`@roots/bud-entrypoints`)
      .setOption(`publicPath`, ``)
    this.logger.success(`unset entrypoints publicPath`)

    bud.extensions
      .get(`@roots/bud-extensions/webpack-manifest-plugin`)
      .setOption(`publicPath`, ``)
    this.logger.success(`unset manifest publicPath`)

    /**
     * Write hmr.json
     */
    if (bud.isDevelopment) {
      bud.hooks.action(`compiler.close`, eventCompilerDone)
      this.logger.success(`registered compiler.close callback`)
    }
  }
}
