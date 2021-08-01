/**
 * @module @roots/bud-imagemin
 */

import {Imagemin} from '@roots/bud-framework'
import * as ImageminPlugin from 'image-minimizer-webpack-plugin'

/**
 * @const WebpackPlugin
 */
const WebpackPlugin: Imagemin.Plugin = {
  /**
   * @property {string} name
   */
  name: 'image-minimizer-webpack-plugin',

  /**
   * @property {Imagemin.Plugin.options} options
   */
  options: () => ({
    minimizerOptions: {
      plugins: [],
    },
  }),

  /**
   * @property {Imagemin.Plugin.make} make
   */
  make: options => {
    return new ImageminPlugin(options.all())
  },

  /**
   * @property {Imagemin.Plugin.when} when
   */
  when: ({isProduction}, options) =>
    isProduction &&
    options.isArray('minimizerOptions.plugins') &&
    options.get('minimizerOptions.plugins').length > 0,
}

/**
 * @exports WebpackPlugin
 */
export {WebpackPlugin}
