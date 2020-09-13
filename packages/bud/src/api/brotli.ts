import {Api} from '@roots/bud-types'

const brotli: Api.Brotli = function (options?) {
  this.features.set('brotli', true)
  options &&
    this.options.merge(
      'webpack.plugins.compression.brotli',
      options,
    )

  return this
}

export {brotli}
