import {Plugin} from './clean-webpack-plugin.dependencies'
import type {
  Container,
  Extension,
  Options,
} from './clean-webpack-plugin.interface'

const BudCleanWebpackPlugin: Extension.CompilerPlugin<
  any,
  Options
> = {
  name: 'clean-webpack-plugin',

  options: ({store}) =>
    store.get('extension.cleanWebpackPlugin'),

  make: (options: Container<Options>) =>
    new Plugin(options.all()),

  when: ({store}) => store.isTrue('clean'),
}

export const {name, options, when, make} = BudCleanWebpackPlugin
