import {Module} from '@roots/bud-framework'
import {
  Options,
  CleanWebpackPlugin as Plugin,
} from 'clean-webpack-plugin'

const extension: Module<Plugin, Options> = {
  name: 'clean-webpack-plugin',
  options: ({store}) =>
    store.get('extension.cleanWebpackPlugin'),
  make: options => new Plugin(options.all()),
  when: ({store}) => store.isTrue('clean'),
}

export const {name, options, when, make} = extension
