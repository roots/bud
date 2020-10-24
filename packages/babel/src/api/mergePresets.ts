import {lodash as _} from '@roots/bud-support'

/**
 * Merge babel presets
 */
export const mergePresets: Babel.Config = function (
  presets: Babel.Plugin[],
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
