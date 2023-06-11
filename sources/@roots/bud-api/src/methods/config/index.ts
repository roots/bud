import type {Bud} from '@roots/bud-framework'
import type {Configuration} from '@roots/bud-framework/config'

import {InputError} from '@roots/bud-support/errors'
import isFunction from '@roots/bud-support/lodash/isFunction'

export type Parameters = [
  | ((config: Partial<Configuration>) => Partial<Configuration>)
  | Partial<Configuration>,
]

export interface config {
  (...parameters: Parameters): Bud
}

export const config: config = function (this: Bud, input): Bud {
  if (!input)
    throw new InputError(
      `config input must pass a callback function that returns a webpack configuration`,
      {
        props: {
          docs: new URL(`https://bud.js.org/docs/bud.config`),
          thrownBy: `bud.config`,
        },
      },
    )

  this.hooks.action(`build.after`, async app => {
    if (!app) return

    app.build.config = isFunction(input)
      ? input(app.build.config)
      : {...app.build.config, ...input}
  })

  return this
}
