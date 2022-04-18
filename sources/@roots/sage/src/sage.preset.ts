import * as Framework from '@roots/bud-framework'
import {bind} from '@roots/bud-support'

import * as acorn from './acorn'
import * as ThemeJSON from './theme/extension'

export interface Sage extends Framework.Extension.Extension {}

/**
 * @public
 */
export class Sage extends Framework.Extension.Extension {
  /**
   * @public
   */
  public label = '@roots/sage'

  /**
   * @public
   */
  public pathHandles = {
    '@src': 'resources',
    '@dist': 'public',
    '@resources': '@src',
    '@public': '@dist',
    '@fonts': '@src/fonts',
    '@images': '@src/images',
    '@scripts': '@src/scripts',
    '@styles': '@src/styles',
    '@views': '@src/views',
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public async boot() {
    acorn.setSvgEmit(this.app)
    acorn.setManifestPublicPath(this.app)
    acorn.setPublicPath(this.app)
    acorn.hmrJson(this.app)

    await this.app.extensions.add(ThemeJSON)

    this.app.setPath(this.pathHandles)

    this.app.alias({
      '@fonts': this.app.path('@fonts'),
      '@images': this.app.path('@images'),
      '@scripts': this.app.path('@scripts'),
      '@styles': this.app.path('@styles'),
    })

    this.app.splitChunks()
    this.app.when(
      this.app.isProduction,
      () => this.app.minimize().hash().runtime('single'),
      () => this.app.devtool(),
    )
  }
}
