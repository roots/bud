import './interface'
import {Framework, Module} from '@roots/bud-framework'
import StylelintPlugin from 'stylelint-webpack-plugin'

export const name: Module['name'] = 'stylelint-webpack-plugin'

export const options: Module['options'] = (app: Framework) => ({
  context: app.subscribe('location/project'),
})

export const make: Module['make'] = options =>
  new StylelintPlugin(options.all())
