import {Extension} from './interface'
import EslintPlugin from 'eslint-webpack-plugin'

const extension: Extension = {
  name: 'eslint-webpack-plugin',

  options: ({path}) => ({
    extensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
    cache: true,
    cacheLocation: path('storage'),
    context: path('src'),
  }),

  make: options => new EslintPlugin(options.all()),
}

export default extension
export const {name, options, make} = extension
