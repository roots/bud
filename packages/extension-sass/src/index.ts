import type {
  Framework,
  Module,
  Item,
  Loader,
  Rule,
} from '@roots/bud-typings'

import * as rule from './rules'
import * as item from './items'

export const registerItem: Module.RegisterOne<Item.Module> = [
  'sass',
  item,
]

export const registerRule: Module.RegisterOne<Rule.Module> = [
  'sass',
  rule,
]
export const registerLoader: Module.RegisterOne<Loader> = [
  'sass-loader',
  require.resolve('sass-loader'),
]

export const boot: Module.Boot = (bud: Framework): void => {
  ;['sass', 'scss'].forEach(ext => {
    !bud.config.get('resolve.extensions').includes(ext) &&
      bud.config.merge('resolve.extensions', [`.${ext}`])
  })
}
