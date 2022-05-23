import {Bud, Extension} from '@roots/bud-framework'
import {
  bind,
  label,
  plugin,
} from '@roots/bud-framework/src/extension/decorators'
import Plugin from 'compression-webpack-plugin'

import {BudCompressionExtension} from './'

@label('compression-webpack-plugin-brotli')
@plugin(Plugin)
class BudBrotliWebpackPlugin extends Extension<
  BudCompressionExtension.Options,
  Plugin
> {
  public _options = {
    algorithm: () => 'brotliCompress',
    filename: () => '[name].br[query]',
    test: () => /\.js$|\.css$|\.html$|\.htm$/,
    compressionOptions: () => ({
      level: 11,
    }),
    threshold: () => 10240,
    minRatio: () => 0.8,
    deleteOriginalAssets: () => false,
  }

  @bind
  public async when() {
    return this.app.hooks.filter('feature.brotli')
  }

  @bind
  public async register() {
    this.app.api.bindFacade('brotli', this.config)
  }

  @bind
  public async config(
    options: BudCompressionExtension.Options,
  ): Promise<Bud> {
    this.app.hooks.on('feature.brotli', true)

    options && this.setOptions(options)

    return this.app
  }
}

export default BudBrotliWebpackPlugin
