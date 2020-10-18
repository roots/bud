export const test: Framework.Rule.Factory<Framework.Rule.Conditional> = bud =>
  bud.patterns.get('html')

export const use: Framework.Rule.Factory<Framework.Rule.Conditional> = bud =>
  bud.build.items.raw.make()
