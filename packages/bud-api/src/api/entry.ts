import type {Framework} from '@roots/bud-typings'
import {isArray, isString} from '@roots/bud-support'

export const entry: Entry = function (bundle, assets) {
  this.config.merge(
    'entry',
    isString(assets) || isArray(assets)
      ? {
          [`${bundle}`]: assets,
        }
      : assets,
  )

  return this
}

export type Entry = (
  this: Framework,
  bundleName: string,
  assets:
    | string
    | string[]
    | {
        [key: string]: string | string[]
      },
) => Framework
