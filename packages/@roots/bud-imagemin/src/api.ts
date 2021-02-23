import {Framework} from '@roots/bud-framework'

/**
 * Configure imagemin plugins.
 */
export const imagemin: Framework.Imagemin.Configure = function (
  options,
) {
  this.extensions
    .get('image-minimizer-webpack-plugin')
    .merge('options.minimizerOptions', options)

  return this
}
