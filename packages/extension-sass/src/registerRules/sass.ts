export const test: Sass.Conditional = ({patterns}) =>
  patterns.get('sass')

export const exclude: Sass.Exclude = ({patterns}) =>
  patterns.get('modules')

export const use: Framework.Rule.Factory<Framework.Rule.Use> = instance => {
  return [
    instance.mode.is('production') ? 'minicss' : 'style',
    'css',
    'postcss',
    'sass',
    'resolveUrl',
  ].reduce((modules, loader) => {
    const loaderModule = instance.build.getItem(loader)
    return !loaderModule ? modules : [...modules, loaderModule]
  }, [])
}
