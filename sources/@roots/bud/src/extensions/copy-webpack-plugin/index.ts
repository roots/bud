import type {Extension} from './copy-webpack-plugin.interface'

const BudCopyWebpackPlugin: Extension = {
  label: 'copy-webpack-plugin',

  options: () => ({
    patterns: [],
  }),

  make: options =>
    new (require('copy-webpack-plugin'))({
      ...options.all(),
    }),

  when(_app, options) {
    return options.has('patterns') && options.get('patterns')?.length > 0
  },
}

export const {label, options, make, when} = BudCopyWebpackPlugin
