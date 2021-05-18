import {Extension} from './interface'
import Plugin from 'stylelint-webpack-plugin'

const extension: Extension = {
  name: 'stylelint-webpack-plugin',
  options: app => ({
    context: app.path('project'),
  }),
  make: opts => new Plugin(opts.all()),
}

export const {name, options, make} = extension
