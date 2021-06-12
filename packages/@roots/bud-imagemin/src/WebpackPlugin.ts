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
  when: ({isProduction}) => isProduction,
}

export {WebpackPlugin}
