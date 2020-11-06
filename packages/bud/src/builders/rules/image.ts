export const test: Framework.Rule.Factory<Framework.Rule.Conditional> = bud =>
  bud.patterns.get('image')

export const use: Framework.Rule.Factory<Framework.Rule.Conditional> = bud => [
  bud.build.getItem('file'),
]
