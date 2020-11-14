import {lodash as _} from '@roots/bud-support'
import {Bud} from '@roots/bud-typings'

export const entry = function (
  this: Bud.Contract,
  name: string,
  assets: string | string[] | {[key: string]: string | string[]},
): Bud.Contract {
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
