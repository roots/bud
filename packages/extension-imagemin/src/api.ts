import {Bud} from '@roots/bud'

/**
 * Configure imagemin plugins.
 */
export const imagemin: Bud.Imagemin = function (options) {
  this.extensions.set(
    'image-minimizer-webpack-plugin.options.minimizerOptions',
    options,
  )

  return this
}
