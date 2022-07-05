import {Extension} from '@roots/bud-framework/extension'
import {bind, label} from '@roots/bud-framework/extension/decorators'
import fs from 'fs-extra'

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
    this.app.when(
      this.app.isProduction,
      async () => {
        const hasHmr = await fs.pathExists(
          this.app.path('@dist', 'hmr.json'),
        )
        if (hasHmr) await fs.remove(this.app.path('@dist', 'hmr.json'))
      },
      async () => {
        this.app.hooks.action('compiler.close', eventCompilerDone)
      },
    )

    /**
     * Public path shenanigans
     */
    this.app.isDevelopment &&
      this.app.hooks.action('config.after', async () => {
        this.app.setPublicPath('/')
      })

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
