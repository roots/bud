export const test: Build.Rule.Factory<Build.Rule.Conditional> = bud =>
  bud.patterns.get('html')

export const use: Build.Rule.Factory<Build.Rule.Conditional> = bud =>
  bud.build.items.raw.make()
