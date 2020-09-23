import HtmlWebpackPlugin from 'html-webpack-plugin'
import {InterpolateHtmlPlugin} from '@roots/bud-support'
import {BudInterface, Plugin, PluginInterface} from '../'

const html: Plugin = (bud: BudInterface): PluginInterface => ({
  bud,

  make: function (): HtmlWebpackPlugin {
    return new HtmlWebpackPlugin({
      inject: true,
      template: this.bud.options.get('plugins.html.template'),
      minify: this.bud.options.get('plugins.html.minify'),
    })
  },

  /**
   * Enabled when html is flagged true
   * and template file is present.
   */
  when: function () {
    return this.bud.features.enabled('html')
  },
})

const interpolateHtml = (
  bud: BudInterface,
): PluginInterface => ({
  bud,

  make: function (): typeof InterpolateHtmlPlugin {
    return new InterpolateHtmlPlugin(
      HtmlWebpackPlugin,
      this.bud.options.get('plugins.html.replacements'),
    )
  },

  /**
   * Enabled when html is flagged true
   * and template file is present.
   */
  when: function () {
    return this.bud.features.enabled('html')
  },
})

export {html, interpolateHtml}
