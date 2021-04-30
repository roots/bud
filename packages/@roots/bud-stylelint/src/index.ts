import './interface'
import type {Module} from '@roots/bud-extensions'
import Plugin from 'stylelint-webpack-plugin'

const extension: Module<Plugin, any> = {
  name: 'stylelint-webpack-plugin',
  options: app => ({
    context: app.path('project'),
  }),
  make: opts => new Plugin(opts.all()),
}

export const {name, options, make} = extension
