import {Bud} from '@roots/bud-typings'
import {make} from './api'
import * as babel from './babel'

export const registerItems = {babel}

export const registerLoaders = {
  [`babel-loader`]: require.resolve('babel-loader'),
}

export function boot(bud: Bud.Contract): void {
  make(bud)

  bud.build.rules.set('js.use', [
    bud.build.items.get('thread'),
    bud.build.items.get('cache'),
    bud.build.items.get('babel'),
  ])
}
