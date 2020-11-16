import type Framework from '@roots/bud-typings'

export const test: Framework.Factory<Framework.Rule.Conditional> = bud =>
  bud.patterns.get('html')

export const use: Framework.Factory<Framework.Rule.Conditional> = bud =>
  bud.build.getItem('raw')
