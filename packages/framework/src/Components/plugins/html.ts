import * as Extension from './../../Extend/Extension'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import {InterpolateHtmlPlugin} from '@roots/bud-support'

const html: Extension.Factory = bud => ({
  bud,

  options: {
    inject: true,
    replacements: {},
    /**
     * This is a little hackish but this is just
     * initial state.. and it _does_ resolve.
     */
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

  make: function (): typeof InterpolateHtmlPlugin {
    return new InterpolateHtmlPlugin(HtmlWebpackPlugin, {})
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
