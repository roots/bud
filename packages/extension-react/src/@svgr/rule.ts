import type {RegisterRule} from '../types'

export const test: RegisterRule.Test = ({patterns}) =>
  patterns.get('svg')

export const use: RegisterRule.Use = ({build}) => [
  build.items.get('@svgr'),
]
