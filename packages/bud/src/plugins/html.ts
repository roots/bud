import HtmlWebpackPlugin from 'html-webpack-plugin'
import {BudInterface, Plugin} from '../'

const html: Plugin = (bud: BudInterface) => ({
  bud,

  make: function (): HtmlWebpackPlugin {
    return new HtmlWebpackPlugin({
      inject: true,
      template: this.bud.fs.get(
        this.bud.options.get('plugins.html.template'),
      ),
      minify: this.bud.options.get('plugins.html.minify'),
    })
  },

  /**
   * Enabled when html is flagged true
   * and template file is present.
   */
  when: function () {
    return (
      this.bud.features.enabled('html') &&
      this.bud.fs.exists(
        this.bud.options.get('plugins.html.template'),
      )
    )
  },
})

export {html as default}
