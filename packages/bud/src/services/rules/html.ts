import type {Framework} from '@roots/bud-typings'

export const test: Framework.Rule['test'] = ({store}) =>
  store.get('patterns.html')

export const use: Framework.Rule['use'] = ({build}) => [
  build.items.get('raw'),
]
