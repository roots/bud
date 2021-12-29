import type {Extension} from './copy-webpack-plugin.interface'

const BudCopyWebpackPlugin: Extension = {
  name: 'copy-webpack-plugin',

  options: () => ({
    patterns: [],
  }),

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
