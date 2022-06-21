import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'
import fs from 'fs-extra'

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
     * `@roots/bud-build` places them, by default, in `@dist/svg/`
     */
    this.app.build.rules.svg.setGenerator(this.svgGenerator)

    /**
     * Write hmr.json when compilation is finalized (only in development)
     * Remove this file when process is exited.
     */
    if (this.app.isProduction) {
      fs.pathExists(this.app.path('@dist', 'hmr.json')) &&
        (await fs.remove(this.app.path('@dist', 'hmr.json')))
    } else {
      this.app.hooks.action('event.compiler.close', eventCompilerDone)
      this.app.hooks.action('event.app.close', eventCompilerClose)
    }

    /**
     * - If publicPath is `/` in production assets will not be locatable by Acorn.
     * - If publicPath is `''` in development bud's dev server will implode.
     * - If publicPath is the actual publicPath acorn will double up the path segments.
     */
    this.app.hooks.action('event.config.after', async () => {
      this.app.hooks.on('build.output.publicPath', publicPath =>
        this.app.isDevelopment ? `/` : publicPath,
      )
    })

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
