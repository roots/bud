import type {Framework} from '@roots/bud-typings'

export const test: Framework.Rule['test'] = ({store}) =>
  store.get('patterns.css')

export const exclude: Framework.Rule['exclude'] = ({store}) =>
  store.get('patterns.modules')

export const use: Framework.Rule['use'] = bud => [
  bud.mode.is('production')
    ? bud.build.items.get('mini-css')
    : bud.build.items.get('style'),
  bud.build.items.get('css'),
]
