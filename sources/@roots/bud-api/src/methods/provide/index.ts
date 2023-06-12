import type {Bud} from '@roots/bud-framework'

import {InputError} from '@roots/bud-support/errors'
import isString from '@roots/bud-support/lodash/isString'
import isUndefined from '@roots/bud-support/lodash/isUndefined'

export type Parameters<
  K extends Array<string> | string = Array<string> | string,
> = [
  K | Record<string, Array<string> | string>,
  (K extends Array<string> | string ? Array<string> | string : never)?,
]

export interface provide {
  (...parameters: Parameters): Promise<Bud>
}

export const provide: provide = async function (this: Bud, ...params) {
  if (!params) {
    throw new Error(`bud.provide: packages must be an object`)
  }
  const plugin = this.extensions.get(
    `@roots/bud-extensions/webpack-provide-plugin`,
  )

  if (!isUndefined(params[1])) {
    const invalidAccessor =
      !Array.isArray(params[0]) && !isString(params[0])
    const invalidValue = !Array.isArray(params[1]) && !isString(params[1])
    if (invalidAccessor || invalidValue) {
      throw new InputError(
        `bud.provide: when specifying a key and value, both must be strings or arrays`,
        {
          props: {
            docs: new URL(`https://roots.io/bud/docs/bud.provide`),
            thrownBy: `bud.provide`,
          },
        },
      )
    }

    const value = params[0]
    const accessors = !Array.isArray(params[1]) ? [params[1]] : params[1]

    accessors.forEach(accessor =>
      plugin.setOptions({...plugin.options, [`${accessor}`]: value}),
    )

    return this
  }

  const modified = Object.entries(params[0]).reduce(
    (acc, [key, value]) => {
      if (!Array.isArray(value)) return {...acc, [value]: key}
      return value.reduce((all, item) => ({...all, [item]: key}), acc)
    },
    plugin.options ?? {},
  )

  plugin.setOptions(modified)

  return this
}
