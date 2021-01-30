import './interface'

import {Bud} from '@roots/bud'

import StylelintPlugin from 'stylelint-webpack-plugin'

/**
 * Extension name
 */
export const name = 'stylelint-webpack-plugin'

/**
 * Extension options
 */
export const options = app => ({
  context: app.src(),
})

/**
 * Extension make
 */
export const make = (
  options: Bud.Container<Bud.Stylelint.Options>,
) => new StylelintPlugin(options.all())

/**
 * Extension config fn
 */
export const api: Bud.Stylelint.Api = {
  stylelint: function (userOpts) {
    this.extensions
      .get(name)
      .mutate('options', (options: Bud.Stylelint.Options) => ({
        ...options,
        ...userOpts,
      }))

    return this
  },
}
