/**
 * Merge babel plugins
 */
export const addPlugin: Babel.Config = function (
  name: babel.PluginTarget,
  opts?: babel.PluginOptions,
) {
  const plugin = [name]

  opts && plugin.push(opts)

  this.bud.build.items.merge('babel.options.plugins', [plugin])

  return this
}
