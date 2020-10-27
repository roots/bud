import type {Conditional, Exclude} from '../types'

export const test: Conditional = ({patterns}) =>
  patterns.get('sass')

export const exclude: Exclude = ({patterns}) =>
  patterns.get('modules')

export const use: Framework.Rule.Factory<Framework.Rule.Use> = bud => {
  return [
    bud.mode.is('production') ? 'minicss' : 'style',
    'css',
    'postcss',
    'sass',
    'resolveUrl',
  ].reduce((modules, loader) => {
    const loaderModule = bud.build.getItem(loader)
    return !loaderModule ? modules : [...modules, loaderModule]
  }, [])
}
