import HtmlWebpackPlugin from 'html-webpack-plugin'
import {BudInterface, Plugin} from '../'

const html: Plugin = (bud: BudInterface) => ({
  bud,
  make: function (): HtmlWebpackPlugin {
    return new HtmlWebpackPlugin({
      filename: 'index.html',
    })
  },
})

export {html as default}
