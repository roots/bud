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
    this.logger.success(`set svg generator path`)

    /**
     * Write hmr.json
     */
    if (this.app.isDevelopment) {
      this.app.hooks.action(`compiler.close`, eventCompilerDone)
      this.logger.success(`registered compiler.close callback`)
    }
  }

  /**
   * `configAfter` callback
   */
  @bind
  public async configAfter() {
    this.app.extensions
      .get(`@roots/bud-entrypoints`)
      .setOption(`publicPath`, ``)

    this.logger.success(`unset entrypoints publicPath`)

    this.app.extensions
      .get(`@roots/bud-extensions/webpack-manifest-plugin`)
      .setOption(`publicPath`, ``)

    this.logger.success(`unset manifest publicPath`)

    if (this.app.isDevelopment) {
      this.app.setPublicPath(`/`)
      this.logger.success(`set publicPath to / for dev`)
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
