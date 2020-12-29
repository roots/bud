import type {Framework, Rule} from '@roots/bud-typings'

export const test: Rule.Module['test'] = ({patterns}) =>
  patterns.get('sass')

export const exclude: Rule.Module['exclude'] = ({patterns}) =>
  patterns.get('modules')

export const use: Rule.Module['use'] = (bud: Framework) => [
  bud.build.items.get(
    bud.mode.is('production') ? 'mini-css' : 'style',
  ),
  bud.build.items.get('css'),
  bud.build.items.get('postcss'),
  bud.build.items.get('sass'),
  bud.build.items.get('resolve-url'),
]
