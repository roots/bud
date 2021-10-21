import {Plugin} from './clean-webpack-plugin.dependencies'
import type {
  CleanWebpackPlugin,
  Container,
  Extension,
} from './clean-webpack-plugin.interface'

const BudCleanWebpackPlugin: Extension = {
  name: 'clean-webpack-plugin',

  options: ({store}) =>
    store.get('extension.clean-webpack-plugin'),

  make: (options: Container<CleanWebpackPlugin.Options>) =>
    new Plugin(options.all()),

  when: ({store}) => store.isTrue('clean'),
}

const {name, options, when, make} = BudCleanWebpackPlugin

export {name, options, when, make}
