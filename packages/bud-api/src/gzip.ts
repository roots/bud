import {Api} from '@roots/bud-typings'

export const gzip: Api.Gzip = function (options?) {
  this.features.enable('gzip')

  if (!options) return

  this.extensions
    .get('compression-webpack-plugin-gzip')
    .setOptions(options)

  return this
}
