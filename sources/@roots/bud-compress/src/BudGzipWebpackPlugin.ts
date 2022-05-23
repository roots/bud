import {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {bind} from '@roots/bud-framework/extension/decorators'
import Plugin from 'compression-webpack-plugin'

import {BudCompressionExtension} from './'

class BudGzipWebpackPlugin extends Extension<
  BudCompressionExtension.Options,
  Plugin
> {
  public label = 'compression-webpack-plugin-brotli'

  public optionsValue = () => ({
    algorithm: 'brotliCompress',
    filename: '[name].br[query]',
    test: /\.js$|\.css$|\.html$|\.htm$/,
    compressionOptions: {
      level: 11,
    },
    threshold: 10240,
    minRatio: 0.8,
    deleteOriginalAssets: false,
  })

  public async make() {
    return new Plugin(this.options)
  }

  public async when() {
    return this.app.hooks.filter('feature.gzip')
  }

  @bind
  public async register() {
    this.app.api.bindFacade('gzip', this.config)
  }

  @bind
  public async config(
    options: BudCompressionExtension.Options,
  ): Promise<Bud> {
    this.app.hooks.on('feature.gzip', true)

    options && this.setOptions(options)

    return this.app
  }
}

export default BudGzipWebpackPlugin
