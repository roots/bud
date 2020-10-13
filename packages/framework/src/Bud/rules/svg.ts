export const test: Build.Rule.Factory<Build.Rule.Conditional> = bud =>
  bud.patterns.get('svg')

export const use: Build.Rule.Factory<Build.Rule.Conditional> = bud => [
  bud.build.items.svg.make(),
]
