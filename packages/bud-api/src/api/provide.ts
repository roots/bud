import {lodash as _} from '@roots/bud-support'
import type {Bud} from '@roots/bud-framework'

export const provide: Provide = function (options) {
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
export type Provide = (
  this: Bud,
  options: {
    [key: string]: string[]
  },
) => Bud
