import type {Imagemin} from './imagemin/typings'
/**
 * Enable imagemin
 */
export const imagemin: Imagemin.Config = function (enabled) {
  this.features.set('imagemin', enabled ?? true)

  return this
}

/**
 * Configure imagemin plugins.
 */
export const imageminPlugins: Imagemin.ConfigPlugins = function (
  plugins,
) {
  plugins &&
    this.extensions
      .get('image-minimizer-webpack-plugin')
      .set('minimizerOptions.plugins', plugins)

  return this
}

/**
 * Configure imagemin options
 */
export const imageminOption: Imagemin.ConfigOption = function (
  key,
  value,
) {
  this.extensions
    .get('image-minimizer-webpack-plugin')
    .set(key, value)

  return this
}
