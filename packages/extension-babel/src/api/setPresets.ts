/**
 * Merge babel plugins
 */
export const setPresets: Babel.Config = function (
  presets: Babel.Plugin,
) {
  this.bud.build.items.set('babel.options.presets', presets)

  return this
}
