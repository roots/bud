import {Module} from '@roots/bud-framework'
import {
  Options,
  CleanWebpackPlugin as Plugin,
} from 'clean-webpack-plugin'

const extension: Module<Plugin, Options> = {
  name: 'clean-webpack-plugin',
  options: ({store}) =>
    store.get('extension.cleanWebpackPlugin'),
  make: opts => new Plugin(opts.all()),
}

export const {name, options, make} = extension
