import {Bud} from '@roots/bud'

/**
 * Configure imagemin plugins.
 */
export const imagemin: Bud.Imagemin.Configure = function (
  options,
) {
  this.extensions.add(
    'image-minimizer-webpack-plugin.options.minimizerOptions',
    options,
  )

  return this
}
