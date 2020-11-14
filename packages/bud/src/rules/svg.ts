import type Framework from '@roots/bud-typings'

export const test: Framework.Factory<Framework.Rule.Conditional> = ({
  patterns,
}) => patterns.get('svg')

export const use: Framework.Factory<Framework.Rule.Conditional> = ({
  build,
}) => [build.getItem('svg')]
