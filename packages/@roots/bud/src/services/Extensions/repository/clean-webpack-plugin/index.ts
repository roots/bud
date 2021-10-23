import {Plugin} from './clean-webpack-plugin.dependencies'
import type {
  Container,
  Extension,
  Options,
} from './clean-webpack-plugin.interface'

const BudCleanWebpackPlugin: Extension = {
  name: 'clean-webpack-plugin',

  options: ({store}) =>
    store.get('extension.clean-webpack-plugin'),

  make: (options: Container<Options>) =>
    new Plugin(options.all()),

  when: ({store}) => store.isTrue('clean'),
}

const {name, options, when, make} = BudCleanWebpackPlugin

export {name, options, when, make}
