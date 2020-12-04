import type {Loader} from '../types'

export const registerLoader: Loader = [
  'postcss-loader',
  require.resolve('postcss-loader'),
]
