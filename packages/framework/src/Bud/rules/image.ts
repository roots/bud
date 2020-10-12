export const test: Build.Rule.Factory<Build.Rule.Conditional> = bud =>
  bud.store['patterns'].get('image')

export const use: Build.Rule.Factory<Build.Rule.Conditional> = bud => [
  bud.build.items.file.make(),
]
