import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'

import eventCompilerDone from './hooks/event.compiler.done.js'

/**
 * Acorn adapter
 *
 * @public
 * @decorator `@label`
 */
@label(`@roots/sage/acorn`)
export default class Acorn extends Extension {
  /**
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async register(bud: Bud) {
    /**
     * Override output directory for svg assets
     *
     * `@roots/bud-build` places them, by default, in `@dist/svg/`
     */
    bud.build.rules.svg.setGenerator(this.svgGenerator)
    this.logger.success(`set svg generator path`)

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

  /**
   * SVG generator
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public svgGenerator({path, relPath}) {
    return {filename: relPath(path(`@dist`), path(`@dist/images/@name`))}
  }
}
