import {Plugin} from './webpack-provide-plugin.dependencies'
import {Model} from './webpack-provide-plugin.interface'

/**
 * BudWebpackProvidePlugin
 *
 * @public
 */
const BudWebpackProvidePlugin: Model = {
  label: 'webpack-provide-plugin',

  make: options => new Plugin(options.all()),

  when: (_app, options) => options?.getEntries().length > 0,
}

export const {label, make, when} = BudWebpackProvidePlugin
