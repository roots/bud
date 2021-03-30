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
  context: app.subscribe('location/project'),
})

/**
 * Extension make
 */
export const make: Module['make'] = options =>
  new StylelintPlugin(options.all())
