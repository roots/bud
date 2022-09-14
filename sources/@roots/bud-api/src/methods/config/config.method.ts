import type {Bud} from '@roots/bud-framework'
import {isFunction} from '@roots/bud-support/lodash-es'
import type {Configuration} from 'webpack'

export interface override {
  (config: Partial<Configuration>): Partial<Configuration>
}

export interface config {
  (input: override | Partial<Configuration>): Bud
}

export const config: config = function (input): Bud {
  const ctx = this as Bud

  if (!input)
    throw new Error(
      `config input must pass a callback function that returns a webpack configuration`,
    )

  ctx.hooks.action(`build.after`, async app => {
    app.build.config = isFunction(input)
      ? input(app.build.config)
      : {
          ...app.build.config,
          ...input,
        }
  })

  return ctx
}
