import {lodash as _} from '@roots/bud-support'
import type {BabelConfig, ConfigureBabel} from '.'

/**
 * Merge babel plugins
 */
export const addPreset: ConfigureBabel = function (
  this: BabelConfig,
  name: babel.PluginTarget,
  presetOptions?: babel.PluginOptions,
) {
  const {options} = this.bud.build.getItem('babel') as any // 😇

  const preset = [name]
  presetOptions && preset.push(presetOptions)

  this.bud.build.mergeItem('babel', {
    options: {
      ...options,
      presets: [...(options.presets ?? []), preset],
    },
  })

  return this
}
