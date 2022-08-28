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
  public async register() {
    /**
     * Override output directory for svg assets
     *
     * `@roots/bud-build` places them, by default, in `@dist/svg/`
     */
    this.app.build.rules.svg.setGenerator(this.svgGenerator)

    /**
     * Write hmr.json
     */
    this.app.isDevelopment &&
      this.app.hooks.action(`compiler.close`, eventCompilerDone)
  }

  /**
   * `configAfter` callback
   */
  @bind
  public async configAfter() {
    this.app.extensions
      .get(`@roots/bud-entrypoints`)
      .setOption(`publicPath`, ``)

    this.app.extensions
      .get(`webpack-manifest-plugin`)
      .setOption(`publicPath`, ``)

    this.app.isDevelopment && this.app.setPublicPath(`/`)
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
