import type {Framework} from '@roots/bud-typings'
import type {PluginTarget, PluginOptions} from '@babel/core'

/**
 * Merge babel plugins
 */
export const addPreset = function (
  name: PluginTarget,
  opts?: PluginOptions,
): Framework {
  const preset = [name]
  opts && preset.push(opts)

  this.bud.build.items.merge('babel.options.presets', preset)

  return this
}
