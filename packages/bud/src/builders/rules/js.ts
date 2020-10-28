import type {Rule} from '@roots/bud-typings'

export const test: Rule.Factory<Rule.Conditional> = bud =>
  bud.patterns.get('js')

export const exclude: Rule.Factory<Rule.Conditional> = bud =>
  bud.patterns.get('modules')

export const use: Rule.Factory<Rule.Use> = bud => [
  bud.build.items.raw.make(),
]
