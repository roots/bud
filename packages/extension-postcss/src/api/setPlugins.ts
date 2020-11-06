/**
 * Merge postcss plugins
 */
export const setPlugins: PostCss.Config = function (
  plugins: PostCss.PluginStore,
) {
  this.bud.build.items.set(
    'postcss.options.postcssOptions.plugins',
    plugins,
  )

  return this
}
