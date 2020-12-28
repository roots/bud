import type {Framework} from '@roots/bud-typings'

export const test: Framework.Rule['test'] = ({patterns}) =>
  patterns.get('image')

export const use: Framework.Rule['use'] = ({build}) => [
  build.getItem('file'),
]
