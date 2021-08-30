import type {Framework, Module} from '@roots/bud-framework'
import {ProvidePlugin as Plugin} from 'webpack'

interface BudWebpackProvidePlugin
  extends Module<
    Plugin,
    Framework.Index<Framework.Index<any>>
  > {}

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
