export const test: Build.Rule.Factory<Build.Rule.Conditional> = bud =>
  bud.patterns.get('image')

export const use: Build.Rule.Factory<Build.Rule.Conditional> = bud => [
  bud.build.items.file.make(),
]
