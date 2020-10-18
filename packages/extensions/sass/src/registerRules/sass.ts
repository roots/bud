import * as syntax from 'postcss-scss'
import type {Conditional, Exclude, UseLoader} from '../types'

export const test: Conditional = bud => bud.patterns.get('sass')

export const exclude: Exclude = bud =>
  bud.patterns.get('modules')

export const use: Framework.Rule.Factory<Framework.Rule.Use> = bud => {
  const use: UseLoader = item => bud.build.items[item]?.make()

  const base = [
    bud.mode.is('production') ? use('minicss') : use('style'),
    use('css'),
    use('sass'),
    use('resolveUrl'),
  ]

  if (!bud.build.items.hasOwnProperty('postcss')) return base

  bud.build.items.postcss.options.postcssOptions.syntax = syntax
  bud.build.items.css.options.importLoaders = 2

  return [...base.splice(0, 2), use('postcss'), ...base]
}
