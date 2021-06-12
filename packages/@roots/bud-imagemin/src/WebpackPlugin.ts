import {Imagemin} from '@roots/bud-framework'
import ImageminPlugin from 'image-minimizer-webpack-plugin'

const WebpackPlugin: Imagemin.Plugin = {
  name: 'image-minimizer-webpack-plugin',
  options: () => ({
    minimizerOptions: {
      plugins: [],
    },
  }),
  make: options => {
    return new ImageminPlugin(options.all())
  },
  when: ({isProduction}, options) =>
    isProduction &&
    options.isArray('minimizerOptions.plugins') &&
    options.get('minimizerOptions.plugins').length > 0,
}

export {WebpackPlugin}
