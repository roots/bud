export const postPluginConfig: API.PostPluginConfig = function (
  plugin,
  options,
) {
  const pluginLiteral = `plugins.${plugin}`
  const [instance] = this.store['postcss'].get(pluginLiteral)
  this.store['postcss'].set(pluginLiteral, [instance, options])

  return this
}
