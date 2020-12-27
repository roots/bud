import type {Rule} from '@roots/bud-typings'

export const test: Rule.Module['test'] = ({patterns}) =>
  patterns.get('svg')

export const use: Rule.Module['use'] = ({build}) => [
  build.items.get('@svgr'),
]
