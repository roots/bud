import type {Bud} from '@roots/bud-framework'

import {InputError} from '@roots/bud-support/errors'
import isString from '@roots/bud-support/isString'
import isUndefined from '@roots/bud-support/isUndefined'

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
    const value = params[0]
    const accessors = !Array.isArray(params[1]) ? [params[1]] : params[1]

    if (!valid(value) || !valid(accessors)) {
      throw new InputError(
        `bud.provide: when specifying a key and value using multiple parameters, the key should be a string and the value should be a string or array of strings`,
        {
          docs: new URL(`https://bud.js.org/reference/bud.provide`),
          thrownBy: `bud.provide`,
        },
      )
    }

    accessors.forEach(accessor =>
      plugin.setOptions({...plugin.options, [`${accessor}`]: value}),
    )

    return this
  }

  const modified = Object.entries(params[0]).reduce(
    (acc, [key, values]) => {
      if (!Array.isArray(values)) return {...acc, [values]: key}
      return values.reduce(
        (all, value) => ({...all, [`${value}`]: key}),
        acc,
      )
    },
    plugin.options ?? {},
  )

  plugin.setOptions(modified)

  return this
}

const valid = (param: unknown): param is Array<unknown> | string =>
  Array.isArray(param) || isString(param)
