/**
 * Merge postcss plugins
 */
export const mergePlugins: PostCss.Config = function (
  plugins: PostCss.PluginStore,
) {
  this.bud.build.items.merge(
    'postcss.options.postcssOptions.plugins',
    plugins,
  )

  return this
}
