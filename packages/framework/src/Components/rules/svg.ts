export const test: Build.Rule.Factory<Build.Rule.Conditional> = bud =>
  bud.store['patterns'].get('svg')

export const use: Build.Rule.Factory<Build.Rule.Conditional> = bud => [
  bud.components['items'].get('svg-loader').make(),
]
