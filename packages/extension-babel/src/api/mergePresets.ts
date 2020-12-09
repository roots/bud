import {Bud} from '@roots/bud-typings'
import type {PluginTarget, PluginOptions} from '@babel/core'

/**
 * Merge babel presets
 */
export const mergePresets = function (
  presets: [PluginTarget, PluginOptions][],
): Bud {
  this.build.items.merge(
    'babel.options.presets',
    presets.map(preset =>
      typeof preset === 'object' ? preset : [preset],
    ),
  )

  return this
}
