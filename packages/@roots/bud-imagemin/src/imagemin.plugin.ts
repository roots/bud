import {Extension} from '@roots/bud-framework'
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin'
import type {WebpackPluginInstance} from 'webpack'

export const BudImageMinPlugin: Extension.CompilerPlugin<
  WebpackPluginInstance,
  any
> = {
  name: 'image-minimizer-webpack-plugin',

  options: () => ({
    minimizerOptions: {
      plugins: [],
    },
  }),

  make: options => {
    return new ImageMinimizerPlugin(options.all())
  },

  when: app => app.isProduction,
}
