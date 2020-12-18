import type {Imagemin} from './imagemin/typings'

export const imagemin: Imagemin.Config = function (enabled) {
  this.features.set('imagemin', enabled ?? true)

  return this
}

export const imageminPlugins: Imagemin.ConfigPlugins = function (
  plugins,
) {
  plugins &&
    this.extensions
      .get('image-minimizer-webpack-plugin')
      .set('minimizerOptions.plugins', plugins)

  return this
}

export const imageminOption: Imagemin.ConfigOption = function (
  key,
  value,
) {
  this.extensions
    .get('image-minimizer-webpack-plugin')
    .set(key, value)

  return this
}
