import {Bud} from '@roots/bud-typings'
import {make} from './api'
import * as babel from './babel'

export const registerItems = {babel}

export const registerLoaders = {
  [`babel-loader`]: require.resolve('babel-loader'),
}

export function boot(bud: Bud.App): void {
  make(bud)

  bud.build.rules.set('js.use', [
    ...bud.build.rules.get('js.use').slice(0, 2),
    bud.build.items.get('babel'),
    ...bud.build.rules.get('js.use').slice(2),
  ])
}
