import type {Imagemin} from './imagemin/typings'

/**
 * Configure imagemin plugins.
 */
export const imageminPlugins: Imagemin.ConfigPlugins = function (
  plugins,
) {
  plugins &&
    this.extensions.set(
      'image-minimizer-webpack-plugin.options.minimizerOptions.plugins',
      plugins,
    )

  return this
}

/**
 * Configure imagemin options
 */
export const imageminOption: Imagemin.ConfigOption = function (
  key,
  value,
) {
  this.extensions.set(
    `image-minimizer-webpack-plugin.options.${key}`,
    value,
  )

  return this
}
