import * as babel from './babel'
import {babelConfig} from './api'
import {Bud} from '@roots/bud-typings'

export const registerItems = {babel}

export const registerLoaders = {
  [`babel-loader`]: require.resolve('babel-loader'),
}

export function boot(bud: Bud): void {
  bud.babel = babelConfig(bud).init()

  bud.build.rules.set('js.use', [
    ...bud.build.rules.get('js.use').slice(0, 2),
    bud.build.items.get('babel'),
    ...bud.build.rules.get('js.use').slice(2),
  ])
}
