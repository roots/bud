import type Framework from '@roots/bud-typings'

export const test: Framework.Factory<Framework.Rule.Conditional> = ({
  patterns,
}) => patterns.get('js')

export const exclude: Framework.Factory<Framework.Rule.Conditional> = ({
  patterns,
}) => patterns.get('modules')

export const use: Framework.Factory<Framework.Rule.Use> = ({
  build,
}) => [
  build.getItem('thread'),
  build.getItem('cache'),
  build.getItem('raw'),
]
