import * as sass from './sass'
import type {Module, Item, Rule} from '@roots/bud-typings'

export const setItems: Module.Register<Item> = [
  'sass',
  {
    loader: require.resolve('sass-loader'),
    options: {
      implementation: require('sass'),
    },
  },
]

export const setRules: Module.Register<Rule> = ['sass', sass]

export const register: Module.Register = app => {
  app.filters.on('webpack.resolve.extensions', exts => [
    ...exts,
    '.sass',
    '.scss',
  ])
}
