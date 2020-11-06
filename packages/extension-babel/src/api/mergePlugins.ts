/**
 * Merge babel plugins
 */
export const mergePlugins: Babel.Config = function (
  plugins: Babel.Plugin[],
) {
  this.bud.build.items.merge(
    'babel.options.plugins',
    plugins.map(plugin =>
      typeof plugin === 'object' ? plugin : [plugin],
    ),
  )

  return this
}
