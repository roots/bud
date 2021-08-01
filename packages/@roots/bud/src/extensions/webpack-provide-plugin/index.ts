/**
 * @module @roots/bud
 */

import type {Module} from '@roots/bud-framework'
import {ProvidePlugin as Plugin} from 'webpack'

interface Index<T> {
  [key: string]: T
}

const extension: Module<Plugin, Index<Index<any>>> = {
  name: 'webpack-provide-plugin',

  options: ({store}) =>
    store.get('extension.webpackProvidePlugin'),

  make: options => new Plugin(options.all()),

  when: (_app, options) =>
    options && options.getEntries().length > 0,
}

export const {name, options, make, when} = extension
