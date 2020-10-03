import {Config} from '..'

export const postPluginConfig: Config.PostPluginConfig = function (
  plugin,
  options,
) {
  const pluginLiteral = `plugins.${plugin}`
  const [instance] = this.store['postcss'].get(pluginLiteral)
  this.store['postcss'].set(pluginLiteral, [instance, options])

  return this
}
