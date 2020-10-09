export const test: Build.Rule.Factory<Build.Rule.Conditional> = bud =>
  bud.store['patterns'].get('js')

export const exclude: Build.Rule.Factory<Build.Rule.Conditional> = bud =>
  bud.store['patterns'].get('modules')

export const use: Build.Rule.Factory<Build.Rule.Use> = bud => [
  bud.components['items'].get('babel-loader').make(),
]
