import './interface'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'
import StylelintPlugin from 'stylelint-webpack-plugin'

/**
 * Extension name
 */
export const name: Module['name'] = 'stylelint-webpack-plugin'

/**
 * Extension topics
 */
export const topics: Module['topics'] = [
  'extension/stylelint-webpack-plugin/options/context',
]

/**
 * Extension publish
 */
export const publish: Module['publish'] = (app: Framework) => ({
  'extension/stylelint-webpack-plugin/options/context': () =>
    app.src(),
})

/**
 * Extension options
 */
export const options: Module['options'] = (app: Framework) => ({
  context: app.subscribe(
    'extension/stylelint-webpack-plugin/options/context',
  ),
})

/**
 * Extension make
 */
export const make: Module['make'] = options =>
  new StylelintPlugin(options.all())
