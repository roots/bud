import type {Config} from './typings'

export const brotli: Config = function (options?) {
  this.features.set('brotli', true)

  if (!options) return

  this.extensions
    .get('compression-webpack-plugin-brotli')
    .setStore(options)

  return this
}
