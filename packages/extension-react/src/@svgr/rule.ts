import type {Rule} from '@roots/bud-typings'

export const test: Rule.Module['test'] = ({store}) =>
  store.get('patterns.svg')

export const use: Rule.Module['use'] = ({build}) => [
  build.items.get('@svgr'),
]
