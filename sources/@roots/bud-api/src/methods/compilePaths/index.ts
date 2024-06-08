import type {Bud, Rules} from '@roots/bud-framework'

import {InputError} from '@roots/bud-support/errors'
import isArray from '@roots/bud-support/isArray'
import isString from '@roots/bud-support/isString'

export type Source = Array<RegExp | string> | RegExp | string

export type Parameters = [Source, Array<`${keyof Rules & string}`>?]

export interface compilePaths {
  (this: Bud, ...value: Parameters): Bud
}

export const compilePaths: compilePaths = function (sources, rules) {
  const sourcesArray = isArray(sources) ? sources : [sources]

  sourcesArray.forEach(source => {
    if (!isString(source) && !(source instanceof RegExp)) {
      throw new InputError(
        `bud.compilePaths: source must be a string or a regular expression.`,
      )
    }
  })

  this.hooks.action(`build.before`, async bud => {
    const keys: Array<`${keyof Rules & string}`> = (rules ??
      Object.keys(bud.build.rules)) as `${keyof Rules & string}`[]

    const matches = keys.map(key => {
      const match = bud.build.getRule(key)

      if (!match) {
        throw new InputError(
          `bud.compilePaths: \`${key}\` is not a valid rule name.`,
        )
      }

      return match
    })

    matches.map(rule => {
      bud.api.logger.log(`setting compile paths for ${rule.getTest()}`)
      rule.setInclude(sourcesArray)
    })
  })

  return this
}
