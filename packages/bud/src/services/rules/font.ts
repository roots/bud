import type {Framework} from '@roots/bud-typings'

export const test: Framework.Rule['test'] = ({store}) =>
  store.get('patterns.font')

export const use: Framework.Rule['use'] = ({build}) => [
  build.items.get('file'),
]
