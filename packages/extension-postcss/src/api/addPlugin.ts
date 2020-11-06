/**
 * Add postcss plugin
 */
export const addPlugin: PostCss.Config = function (
  name: string,
  plugin: PostCss.PluginTuple,
) {
  this.bud.build.items.merge(
    'postcss.options.postcssOptions.plugins',
    {[name]: plugin},
  )

  return this
}
