import type Framework from '@roots/bud-typings'

export const test: Framework.Factory<Framework.Rule.Conditional> = bud =>
  bud.patterns.get('font')

export const use: Framework.Factory<Framework.Rule.Use> = ({
  build,
}) => [build.getItem('file')]
