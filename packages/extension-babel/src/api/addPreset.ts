/**
 * Merge babel plugins
 */
export const addPreset: Babel.Config = function (
  name: babel.PluginTarget,
  opts?: babel.PluginOptions,
) {
  const preset = [name]
  opts && preset.push(opts)

  this.bud.build.items.merge('babel.options.presets', preset)

  return this
}
