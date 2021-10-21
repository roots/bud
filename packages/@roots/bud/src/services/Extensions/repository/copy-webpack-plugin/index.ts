import {Plugin} from './copy-webpack-plugin.dependencies'
import type {
  Extension,
  Options,
} from './copy-webpack-plugin.interface'

const BudCopyWebpackPlugin: Extension.CompilerPlugin<
  typeof Plugin,
  Options
> = {
  name: 'copy-webpack-plugin',

  options: ({store}) =>
    store.get('extension.copy-webpack-plugin'),

  make: options =>
    new (require('copy-webpack-plugin'))({
      ...options.all(),
    }),

  when(_app, options) {
    return (
      options.has('patterns') &&
      options.get('patterns')?.length > 0
    )
  },
}

export const {name, options, make, when} = BudCopyWebpackPlugin
