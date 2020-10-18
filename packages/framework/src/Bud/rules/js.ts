export const test: Framework.Rule.Factory<Framework.Rule.Conditional> = bud =>
  bud.patterns.get('js')

export const exclude: Framework.Rule.Factory<Framework.Rule.Conditional> = bud =>
  bud.patterns.get('modules')

export const use: Framework.Rule.Factory<Framework.Rule.Use> = bud => [
  bud.build.items.raw.make(),
]
