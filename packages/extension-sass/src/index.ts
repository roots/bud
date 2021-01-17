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
  ;['.sass', '.scss'].forEach(ext => {
    !app.store.get('webpack.resolve.extensions').includes(ext) &&
      app.store.mutate('webpack.resolve.extensions', exts => [
        ...exts,
        ext,
      ])
  })
}
