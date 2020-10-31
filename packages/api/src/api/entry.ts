import {lodash as _} from '@roots/bud-support'

export const entry: Framework.API.Entry = function (
  name: string,
  assets: string | string[],
) {
  assets = _.isString(assets) ? [assets] : assets

  this.build.config.merge('entry', {
    [name]: assets,
  })

  return this
}
