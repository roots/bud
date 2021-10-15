import type {Extension} from '@roots/bud-framework'
import {ProvidePlugin as Plugin} from 'webpack'

/**
 * BudWebpackProvidePlugin
 *
 * @public
 */
const BudWebpackProvidePlugin: Extension.CompilerPlugin<
  Plugin,
  Record<string, Record<string, any>>
> = {
  name: 'webpack-provide-plugin',

  options: ({store}) =>
    store.get('extension.webpackProvidePlugin'),

  make: options => new Plugin(options.all()),

  when: (_app, options) =>
    options && options.getEntries().length > 0,
}

export const {name, options, make, when} =
  BudWebpackProvidePlugin
