import {Framework} from '@roots/bud-framework'

/**
 * Merge babel plugins
 */
export const setPresets: Framework.Babel.SetPlugins = function (
  presets,
) {
  this.build.set('items.babel.options.presets', presets)

  return this
}
