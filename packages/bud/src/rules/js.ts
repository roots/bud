import type {Framework} from '@roots/bud-typings'

export const test: Framework.Rule['test'] = ({patterns}) =>
  patterns.get('js')

export const exclude: Framework.Rule['exclude'] = ({patterns}) =>
  patterns.get('modules')

export const use: Framework.Rule['use'] = ({build}) => [
  build.getItem('raw'),
]
