import {Bud, Extension} from '@roots/bud-framework'
import * as Plugin from 'compression-webpack-plugin'

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

  public async register() {
    this.app.api.bindFacade('gzip', function (options) {
      const app = this as Bud

      this.app.hooks.on('feature.gzip', true)

      if (options)
        app.extensions
          .get('compression-webpack-plugin-gzip')
          .setOptions(options)

      return app
    })
  }
}

export default BudGzipWebpackPlugin
