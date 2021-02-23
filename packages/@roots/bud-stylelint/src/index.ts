import './interface'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'
import StylelintPlugin from 'stylelint-webpack-plugin'

/**
 * Extension name
 */
export const name: Module['name'] = 'stylelint-webpack-plugin'

/**
 * Extension options
 */
export const options: Module['options'] = (app: Framework) => ({
  context: app.src(),
})

/**
 * Extension make
 */
export const make: Module['make'] = options =>
  new StylelintPlugin(options.all())

/**
 * Extension config fn
 */
export const api: Module['api'] & {
  [key: string]: Framework.Stylelint.Config
} = {
  stylelint: function (userOpts) {
    this.extensions
      .get(name)
      .mutate(
        'options',
        (options: Framework.Stylelint.Options) => ({
          ...options,
          ...userOpts,
        }),
      )

    return this
  },
}
