import {lodash as _} from '@roots/bud-support'
import type {Extension} from '@roots/bud-extensions'
import type {Bud} from '@roots/bud-framework'

export const provide: Provide = function (options) {
  const pluginOpts = this.extensions.get(
    'webpack[provide].options',
  ) as Extension.Options

  Object.entries(options).forEach(([key, alias]) => {
    _.isString(alias) && pluginOpts.merge(alias, key)
    _.isArray(alias) &&
      alias.map(alias => pluginOpts.merge(alias, key))
  })

  return this
}

/**
 * Make a module globally available throughout the application.
 */
export type Provide = (
  this: Bud,
  options: {
    [key: string]: string[]
  },
) => Bud
