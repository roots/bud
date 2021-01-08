import type {
  Framework,
  Module,
  Item,
  Loader,
  Rule,
} from '@roots/bud-typings'

import * as rule from './rules'
import * as item from './items'

export const register: Module.Boot = (bud: Framework): void => {
  ;['sass', 'scss'].forEach(ext => {
    !bud.store
      .get('webpack.resolve.extensions')
      .includes(`.${ext}`)
      ? bud.store.mutate('webpack.resolve.extensions', exts => [
          ...exts,
          `.${ext}`,
        ])
      : null
  })
}

export const setItems: Module.Register<Item> = ['sass', item]

export const setRules: Module.Register<Rule> = ['sass', rule]

export const setLoaders: Module.Register<Loader> = [
  'sass-loader',
  require.resolve('sass-loader'),
]
