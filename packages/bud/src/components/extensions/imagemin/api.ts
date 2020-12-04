import type {
  Config,
  ConfigPlugins,
  ConfigOption,
} from './typings'

export const imagemin: Config = function (enabled) {
  this.features.set('imagemin', enabled ?? true)

  return this
}

export const imageminPlugins: ConfigPlugins = function (
  plugins,
) {
  plugins &&
    this.extensions
      .get('image-minimizer-webpack-plugin')
      .set('minimizerOptions.plugins', plugins)

  return this
}

export const imageminOption: ConfigOption = function (
  key,
  value,
) {
  this.extensions
    .get('image-minimizer-webpack-plugin')
    .set(key, value)

  return this
}
