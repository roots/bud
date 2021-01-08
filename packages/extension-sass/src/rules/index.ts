import type {Framework, Rule} from '@roots/bud-typings'

export const test: Rule.Module['test'] = ({store}) =>
  store.get('patterns.sass')

export const exclude: Rule.Module['exclude'] = ({store}) =>
  store.get('patterns.modules')

export const use: Rule.Module['use'] = (bud: Framework) => [
  bud.mode.is('production')
    ? bud.build.items.get('mini-css')
    : bud.build.items.get('style'),
  bud.build.items.get('css'),
  bud.build.items.get('sass'),
  bud.build.items.get('resolve-url'),
]
