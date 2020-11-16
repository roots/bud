import {lodash as _} from '@roots/bud-support'
import type {Bud} from '@roots/bud-typings'

export const entry: Entry = function (bundle, assets) {
  this.config.merge(
    'entry',
    _.isString(assets) || _.isArray(assets)
      ? {
          [bundle]: assets,
        }
      : assets,
  )

  return this
}

export type Entry<T = Bud.Contract> = (
  this: T,
  bundleName: string,
  assets:
    | string
    | string[]
    | {
        [key: string]: string | string[]
      },
) => T
