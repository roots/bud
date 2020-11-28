import type {Api} from './typings'

export const imagemin: Api.Imagemin = function (enabled) {
  this.features.set('imagemin', enabled ?? true)

  return this
}

export const imageminPlugins: Api.ImageminPlugins = function (
  plugins,
) {
  plugins &&
    this.extensions
      .get('image-minimizer-webpack-plugin')
      .set('minimizerOptions.plugins', plugins)

  return this
}

export const imageminOption: Api.ImageminOption = function (
  key,
  value,
) {
  this.extensions
    .get('image-minimizer-webpack-plugin')
    .set(key, value)

  return this
}
