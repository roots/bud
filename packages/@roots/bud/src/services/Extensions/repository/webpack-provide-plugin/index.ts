import {Plugin} from './webpack-provide-plugin.dependencies'
import {Model} from './webpack-provide-plugin.interface'

/**
 * BudWebpackProvidePlugin
 *
 * @public
 */
const BudWebpackProvidePlugin: Model = {
  name: 'webpack-provide-plugin',

  options: ({store}) =>
    store.get('extension.webpackProvidePlugin'),

  make: options => new Plugin(options.all()),

  when: (_app, options) =>
    options && options.getEntries().length > 0,
}

export const {name, options, make, when} =
  BudWebpackProvidePlugin
