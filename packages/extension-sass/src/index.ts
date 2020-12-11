import type {
  Bud,
  Extension,
  Item,
  Loader,
  Rule,
} from '@roots/bud-typings'

import * as rule from './rules'
import * as item from './items'

export const registerItem: Extension.Module.RegisterOne<Item.Module> = [
  'sass',
  item,
]

export const registerRule: Extension.Module.RegisterOne<Rule.Module> = [
  'sass',
  rule,
]
export const registerLoader: Extension.Module.RegisterOne<Loader> = [
  'sass-loader',
  require.resolve('sass-loader'),
]

export const boot: Extension.Module.Boot = (bud: Bud): void => {
  /**
   * Resolve sass and scss extensions
   */
  ;['sass', 'scss'].forEach(ext => {
    !bud.config.get('resolve.extensions').includes(ext) &&
      bud.config.merge('resolve.extensions', [`.${ext}`])
  })
}
