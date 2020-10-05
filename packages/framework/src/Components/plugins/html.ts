import * as Extension from '../../Extend/Extension'
import HtmlWebpackPlugin = require('html-webpack-plugin')
import {InterpolateHtmlPlugin} from '@roots/bud-support'

const html: Extension.Factory = bud => ({
  bud,

  options: {
    inject: true,

    template: bud.fs.path.join(
      bud.fs.path.dirname(require.resolve('@roots/bud-support')),
      '/../publish/template.html',
    ),

    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  },

  make: function (): HtmlWebpackPlugin {
    return new HtmlWebpackPlugin(this.options)
  },

  /**
   * Enabled when html is flagged true
   * and template file is present.
   */
  when: function () {
    return this.bud.store['features'].enabled('html')
  },
})

const interpolateHtml: Extension.Factory = bud => ({
  bud,

  replacements: {
    APP_TITLE: '@roots/bud',
  },

  make: function (): InterpolateHtmlPlugin {
    return new InterpolateHtmlPlugin(
      HtmlWebpackPlugin,
      this.replacements,
    )
  },

  /**
   * Enabled when html is flagged true
   * and template file is present.
   */
  when: function () {
    return this.bud.store['features'].enabled('html')
  },
})

export {html, interpolateHtml}
