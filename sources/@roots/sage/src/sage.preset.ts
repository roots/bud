import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  label,
} from '@roots/bud-framework/extension/decorators'

import * as acorn from './acorn'
import ThemeJSON from './theme/extension'

@label('@roots/sage')
@dependsOn(['@roots/bud-preset-wordpress'])
export default class Sage extends Extension {
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
