import type {Bud, Rules} from '@roots/bud-framework'

import {InputError} from '@roots/bud-support/errors'
import isArray from '@roots/bud-support/lodash/isArray'

import type {Parameters} from './compilePaths.types.js'

export interface compilePaths {
  (this: Bud, ...value: Parameters): Bud
}

export const compilePaths: compilePaths = function (
  this: Bud,
  sources,
  rules,
) {
  this.hooks.action(`build.before`, async bud => {
    const keys: Array<`${keyof Rules & string}`> = (rules ??
      Object.keys(bud.build.rules)) as `${keyof Rules & string}`[]

    const matches = keys.map(rule => {
      const match = bud.build.getRule(rule)

      if (!match) {
        throw new InputError(
          `bud.compilePaths: \`${rule}\` is not a valid rule name.`,
          {
            props: {
              [`valid rule names`]: Object.keys(bud.build.rules).join(
                `, `,
              ),
            },
          },
        )
      }

      return match
    })

    matches.map(rule => {
      bud.api.logger.log(`setting compile paths for ${rule.getTest()}`)

      rule.setInclude(isArray(sources) ? sources : [sources])
    })
  })

  return this
}
