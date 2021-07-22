import './interface'

import type {Framework} from '@roots/bud-framework'
import Plugin from 'stylelint-webpack-plugin'

const extension: Framework.Extensions['stylelint-webpack-plugin'] =
  {
    name: 'stylelint-webpack-plugin',
    options: app => ({
      context: app.path('project'),
    }),
    make: opts => new Plugin(opts.all()),
  }

export default extension
export const {name, options, make} = extension
