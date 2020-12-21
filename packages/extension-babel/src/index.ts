import {Module, Item, Loader} from '@roots/bud-typings'
import {make} from './api'
import * as babel from './babel'

export const registerItems: Module.RegisterMany<Item.Module> = {
  babel,
}

export const registerLoaders: Module.RegisterMany<Loader> = {
  [`babel-loader`]: require.resolve('babel-loader'),
}

export const boot: Module.Boot = bud => {
  make(bud)

  bud.build.rules.set('js.use', [
    bud.build.items.get('thread'),
    bud.build.items.get('cache'),
    bud.build.items.get('babel'),
  ])
}
