import {lodash as _} from '@roots/bud-support'
import type {Bud} from '@roots/bud-typings'

export const provide: provide = function (
  options,
): Bud.Contract {
  const providePlugin = this.extensions.get(
    'webpack-provide-plugin',
  )

  const pluginOpts = providePlugin.all()

  Object.entries(options).forEach(([key, alias]) => {
    _.isString(alias) && pluginOpts.merge(alias, key)
    _.isArray(alias) &&
      alias.map(alias => pluginOpts.merge(alias, key))
  })

  providePlugin.repository = pluginOpts

  return this
}

/**
 * Make a module globally available throughout the application.
 */
export type provide = (
  this: Bud.Contract,
  options: {
    [key: string]: string[]
  },
) => Bud.Contract
