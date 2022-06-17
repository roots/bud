import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'

import eventCompilerClose from './hooks/event.compiler.close.js'
import eventCompilerDone from './hooks/event.compiler.done.js'

/**
 * Acorn adapter
 *
 * @public
 * @decorator `@label`
 */
@label('@roots/sage/acorn')
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
     * `@roots/bud-build` places them, by default, in `svg/`
     */
    this.app.build.rules.svg.setGenerator(this.svgGenerator)

    /**
     * Write hmr.json when compilation is finalized (only in development)
     * Remove this file when process is exited.
     */
    this.app.hooks.action(
      'event.compiler.success',
      this.app.isDevelopment ? eventCompilerDone : eventCompilerClose,
    )

    /**
     * Tell Acorn that assets have no `publicPath` even if bud is using one internally.
     * Acorn does its own `pulicPath` processing.
     *
     * Not setting an empty string will likely result in duplicative path segments
     * and unresolved assets.
     */
    this.app.extensions
      .get('@roots/bud-entrypoints')
      .setOption('publicPath', '')
    this.app.extensions
      .get('webpack-manifest-plugin')
      .setOption('publicPath', '')
  }

  /**
   * SVG generator
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public svgGenerator({path, relPath}) {
    return {filename: relPath(path('@dist'), path('@dist/images/@name'))}
  }
}
