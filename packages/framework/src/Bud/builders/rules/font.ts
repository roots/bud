/**
 * Font test
 */
export const test: Framework.Rule.Factory<Framework.Rule.Conditional> = bud =>
  bud.patterns.get('font')

/**
 * Font: Loaders
 */
export const use: Framework.Rule.Factory<Framework.Rule.Use> = bud => [
  bud.build.items.file.make(),
]
