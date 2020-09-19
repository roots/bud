import HtmlWebpackPlugin from 'html-webpack-plugin'
import htmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin'
import {BudInterface, Plugin} from '../'

const html: Plugin = (bud: BudInterface) => ({
  bud,

  make: function (): HtmlWebpackPlugin {
    return new HtmlWebpackPlugin({
      filename: 'index.html',
      alwaysWriteToDisk: true,
    })
  },
})

const htmlWriteToDisk: Plugin = (bud: BudInterface) => ({
  bud,

  make: function (): typeof htmlWebpackHarddiskPlugin {
    return new htmlWebpackHarddiskPlugin()
  },
})

export {html, htmlWriteToDisk}
