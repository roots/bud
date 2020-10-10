export const test: Build.Rule.Factory<Build.Rule.Conditional> = bud =>
  bud.store['patterns'].get('image')

export const use: Build.Rule.Factory<Build.Rule.Conditional> = bud => [
  bud.components['items'].get('file').make(),
]
