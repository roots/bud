/**
 * Merge babel presets
 */
export const mergePresets: Babel.Config = function (
  presets: Babel.Plugin[],
) {
  this.bud.build.items.merge(
    'babel.options.presets',
    presets.map(preset =>
      typeof preset === 'object' ? preset : [preset],
    ),
  )

  return this
}
