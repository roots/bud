import * as syntax from 'postcss-scss'

export const test: Conditional = bud =>
  bud.store['patterns'].get('sass')

export const exclude: Exclude = bud =>
  bud.store['patterns'].get('modules')

export const use: Build.Rule.Factory<Build.Rule.Use> = bud => {
  const items = bud.components['items']
  const use: UseLoader = item => items.get(item)?.make()

  const base = [
    bud.mode.is('production') ? use('minicss') : use('style'),
    use('css'),
    use('sass'),
    use('resolve-url'),
  ]

  if (!items.has('postcss')) {
    return base
  }

  items.get('postcss').options.postcssOptions.syntax = syntax

  items.get('css').setOptions({importLoaders: 2})

  return [...base.slice(0, 2), use('postcss'), ...base.slice(2)]
}

declare type Conditional = Build.Rule.Factory<
  Build.Rule.Conditional
>

declare type Exclude = Build.Rule.Factory<Build.Rule.Conditional>

declare type UseLoader = (loader: string) => Build.Rule
