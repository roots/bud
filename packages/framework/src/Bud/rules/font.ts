/**
 * Font test
 */
export const test: Build.Rule.Factory<Build.Rule.Conditional> = bud =>
  bud.store['patterns'].get('font')

/**
 * Font: Loaders
 */
export const use: Build.Rule.Factory<Build.Rule.Use> = bud => [
  bud.build.items.file.make(),
]
