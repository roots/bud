import {lodash as _} from '@roots/bud-support'

/**
 * Merge babel plugins
 */
export const setPresets: Babel.Config = function (
  presets: Babel.Plugin,
) {
  const {options} = this.bud.build.getItem('babel') as any // 😇

  this.bud.build.mergeItem('babel', {
    options: {
      ...options,
      presets,
    },
  })

  return this
}
