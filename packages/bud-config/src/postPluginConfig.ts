import Bud from '@roots/bud-types'

export const postPluginConfig: Bud.Config.PostPluginConfig = function (
  plugin,
  options,
) {
  const pluginLiteral = `postcss.plugins.${plugin}`

  const [instance] = this.options.get(pluginLiteral)

  this.options.set(pluginLiteral, [instance, options])

  return this
}
