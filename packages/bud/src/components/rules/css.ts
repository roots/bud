import type {Bud, Factory, Rule} from '@roots/bud-typings'

export const test: Factory<Rule.Conditional> = ({patterns}) =>
  patterns.get('css')

export const exclude: Factory<Rule.Conditional> = ({patterns}) =>
  patterns.get('modules')

export const use: Factory<Rule.Use> = (bud: Bud.Bud) => [
  bud.mode.is('production')
    ? bud.build.getItem('mini-css')
    : bud.build.getItem('style'),
  bud.build.getItem('css'),
  bud.build.getItem('resolve-url'),
]
