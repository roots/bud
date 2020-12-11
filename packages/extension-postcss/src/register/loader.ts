import type {RegisterLoader} from '../types'

export const registerLoader: RegisterLoader = [
  'postcss-loader',
  require.resolve('postcss-loader'),
]
