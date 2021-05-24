import {ProvidePlugin as Plugin} from 'webpack'
import type {Module} from '@roots/bud-framework'

interface Index<T> {
  [key: string]: T
}

const extension: Module<Plugin, Index<{[key: string]: any}>> = {
  name: 'webpack-provide-plugin',

  options: ({store}) =>
    store.get('extension.webpackProvidePlugin'),

  make: options => new Plugin(options.all()),

  when: (_app, options) =>
    options && options.getEntries().length > 0,
}

export const {name, options, make, when} = extension
