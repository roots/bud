import type {Bud} from '@roots/bud-framework'
import isFunction from '@roots/bud-support/lodash/isFunction'
import type {Configuration} from '@roots/bud-support/webpack'

export type Parameters = [
  | Partial<Configuration>
  | ((config: Partial<Configuration>) => Partial<Configuration>),
]

export interface config {
  (...parameters: Parameters): Bud
}

export const config: config = function (this: Bud, input): Bud {
  if (!input)
    throw new Error(
      `config input must pass a callback function that returns a webpack configuration`,
    )

  this.hooks.action(`build.after`, async app => {
    if (!app) return

    app.build.config = isFunction(input)
      ? input(app.build.config)
      : {...app.build.config, ...input}
  })

  return this
}
