import type {Framework, Factory, Rule} from '@roots/bud-typings'

export const test: Factory<Rule.Conditional> = ({patterns}) =>
  patterns.get('image')

export const use: Factory<Rule.Use, Framework> = ({build}) => [
  build.getItem('file'),
]
