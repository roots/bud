import * as syntax from 'postcss-scss'
import type {Conditional, Exclude} from '../types'

export const test: Conditional = bud => bud.patterns.get('sass')

export const exclude: Exclude = bud =>
  bud.patterns.get('modules')

export const use: Framework.Rule.Factory<Framework.Rule.Use> = bud => {
  const loaders: any[] = [
    bud.mode.is('production') ? 'minicss' : 'style',
    'css',
    'sass',
    'resolveUrl',
  ].reduce(
    (modules, loader) =>
      !bud.build.getItem(loader)
        ? modules
        : [...modules, bud.build.getItem(loader)],
    [],
  )

  const postcss = bud.build.getItem('postcss')

  if (postcss) {
    bud.build.setItem('postcss', {
      ...postcss,
      options: {
        ...postcss.options,
        postcssOptions: {
          ...postcss.options.postcssOptions,
          syntax,
          importLoaders: 2,
        },
      },
    })
  }

  return Object.values(loaders)
}
