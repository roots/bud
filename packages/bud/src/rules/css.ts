import type {Framework} from '@roots/bud-typings'

export const test: Framework.Rule['test'] = ({patterns}) =>
  patterns.get('css')

export const exclude: Framework.Rule['exclude'] = ({patterns}) =>
  patterns.get('modules')

export const use: Framework.Rule['use'] = bud => [
  bud.mode.is('production')
    ? bud.build.getItem('mini-css')
    : bud.build.getItem('style'),
  bud.build.getItem('css'),
  bud.build.getItem('resolve-url'),
]
