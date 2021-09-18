import type {Extension, Index} from '@roots/bud-framework'
import {ProvidePlugin as Plugin} from 'webpack'

/**
 * {@inheritDoc BudWebpackProvidePlugin}
 *
 * @public
 */
interface BudWebpackProvidePlugin
  extends Extension.CompilerPlugin<Plugin, Index<Index<any>>> {}

/**
 * BudWebpackProvidePlugin
 *
 * @public
 */
const BudWebpackProvidePlugin: BudWebpackProvidePlugin = {
  name: 'webpack-provide-plugin',

  options: ({store}) =>
    store.get('extension.webpackProvidePlugin'),

  make: options => new Plugin(options.all()),

  when: (_app, options) =>
    options && options.getEntries().length > 0,
}

export const {name, options, make, when} =
  BudWebpackProvidePlugin
