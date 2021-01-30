import {Bud} from '@roots/bud'

/**
 * Configure imagemin plugins.
 */
export const imagemin: Bud.Imagemin.Configure = function (
  options,
) {
  this.extensions
    .get('image-minimizer-webpack-plugin')
    .merge('options.minimizerOptions', options)

  return this
}
