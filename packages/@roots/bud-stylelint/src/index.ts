import './interface'

import type {Framework} from '@roots/bud-framework'
import StylelintWebpackPlugin from 'stylelint-webpack-plugin'

const extension: Framework.Stylelint.Extension = {
  name: 'stylelint-webpack-plugin',

  options: app => ({
    context: app.path('project'),
  }),

  make: opts => new StylelintWebpackPlugin(opts.all()),
}

export {extension, extension as default}

export const {name, options, make} = extension
