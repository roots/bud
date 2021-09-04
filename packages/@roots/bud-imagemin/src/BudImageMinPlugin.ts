import {WebpackPlugin} from '@roots/bud-framework'
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin'
import type {WebpackPluginInstance} from 'webpack'

interface BudImageMinPlugin
  extends WebpackPlugin<WebpackPluginInstance, any> {
  name: 'image-minimizer-webpack-plugin'
  make(options: any): WebpackPluginInstance
}

const BudImageMinPlugin: BudImageMinPlugin = {
  name: 'image-minimizer-webpack-plugin',

  options: () => ({
    minimizerOptions: {
      plugins: [],
    },
  }),

  make: options => {
    return new ImageMinimizerPlugin(options.all())
  },

  when: ({isProduction}, options) =>
    isProduction &&
    options.isArray('minimizerOptions.plugins') &&
    options.get('minimizerOptions.plugins').length > 0,
}

export {BudImageMinPlugin}
