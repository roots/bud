import {lodash as _} from '@roots/bud-support'
import type {ConfigureBabel} from '.'

/**
 * Merge babel presets
 */
export const mergePresets: ConfigureBabel = function (
  presets: babel.PluginItem[],
) {
  const {options} = this.bud.build.getItem('babel') as any // 😇

  this.bud.build.mergeItem('babel', {
    options: {
      ...options,
      presets: [
        ...(options.presets ?? []),
        ...(presets
          ? presets.map(preset =>
              typeof preset === 'object' ? preset : [preset],
            )
          : []),
      ],
    },
  })

  return this
}
