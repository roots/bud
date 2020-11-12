import {lodash as _} from '@roots/bud-support'

export const entry: Framework.API.Entry = function (
  name: string,
  assets: string | string[] | {[key: string]: string | string[]},
) {
  this.config.merge(
    'entry',
    _.isString(assets) || _.isArray(assets)
      ? {
          [name]: assets,
        }
      : assets,
  )

  return this
}
