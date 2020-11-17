import type {Factory, Rule} from '@roots/bud-typings'

export const test: Factory<Rule.Conditional> = ({patterns}) =>
  patterns.get('html')

export const use: Factory<Rule.Conditional> = ({build}) =>
  build.getItem('raw')
