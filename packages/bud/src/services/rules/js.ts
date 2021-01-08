import type {Framework} from '@roots/bud-typings'

export const test: Framework.Rule['test'] = ({store}) =>
  store.get('patterns.js')

export const exclude: Framework.Rule['exclude'] = ({store}) =>
  store.get('patterns.modules')

export const use: Framework.Rule['use'] = ({build}) => [
  build.items.get('raw'),
]
