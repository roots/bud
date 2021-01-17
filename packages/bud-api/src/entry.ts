import {isArray, isString} from '@roots/bud-support'
import {Api} from '@roots/bud-typings'

export const entry: Api.Entry = function (bundle, assets) {
  this.hooks.on('webpack.entry', entry => ({
    ...entry,
    ...(isString(assets) || isArray(assets)
      ? {[bundle]: assets}
      : assets),
  }))

  return this
}
