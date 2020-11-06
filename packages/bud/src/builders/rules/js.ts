import type {Rule} from '@roots/bud-typings'

export const test: Rule.Factory<Rule.Conditional> = ({
  patterns,
}) => patterns.get('js')

export const exclude: Rule.Factory<Rule.Conditional> = ({
  patterns,
}) => patterns.get('modules')

export const use: Rule.Factory<Rule.Use> = ({build}) => [
  build.getItem('thread'),
  build.getItem('cache'),
  build.getItem('raw'),
]
