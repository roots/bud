export const test: Framework.Rule.Factory<Framework.Rule.Conditional> = bud =>
  bud.patterns.get('svg')

export const use: Framework.Rule.Factory<Framework.Rule.Conditional> = bud => [
  bud.build.items.svg.make(),
]
