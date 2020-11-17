import type {Factory, Rule} from '@roots/bud-typings'

export const test: Factory<Rule.Conditional> = ({patterns}) =>
  patterns.get('font')

export const use: Factory<Rule.Use> = ({build}) => [
  build.getItem('file'),
]
