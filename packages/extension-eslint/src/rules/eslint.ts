export const test: Framework.Rule.Factory<Framework.Rule.Conditional> = bud =>
  bud.patterns.get('js')

export const exclude: Framework.Rule.Factory<Framework.Rule.Conditional> = bud => [
  bud.patterns.get('modules'),
  /bud/,
]

export const enforce: Framework.Rule.Enforce = 'pre'

export const use: Framework.Rule.Factory<Framework.Rule.Use> = bud => [
  bud.build.getItem('eslint'),
]
