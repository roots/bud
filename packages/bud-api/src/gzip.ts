import {Api} from '@roots/bud-typings'

export const gzip: Api.Gzip = function (options?) {
  this.store.get('features').enable('gzip')

  if (!options) return

  this.extensions.set(
    'compression-webpack-plugin-gzip.options',
    options,
  )

  return this
}
