import {lodash as _} from '@roots/bud-support'
import type {BabelConfig, ConfigureBabel} from '.'

/**
 * Merge babel transformOptions
 */
export const mergeConfig: ConfigureBabel = function (
  this: BabelConfig,
  userCfg: babel.TransformOptions,
) {
  const {options} = this.bud.build.getItem('babel') as any // 😇

  this.bud.build.mergeItem('babel', {
    options: {
      ...options,
      ...userCfg,
      presets: [
        ...(options.presets ?? []),
        ...(userCfg.presets
          ? userCfg.presets.map(preset =>
              typeof preset === 'object' ? preset : [preset],
            )
          : []),
      ],
      plugins: [
        ...(options.plugins ?? []),
        ...(userCfg.plugins
          ? userCfg.plugins.map(plugin =>
              typeof plugin === 'object' ? plugin : [plugin],
            )
          : []),
      ],
    },
  })

  return this
}
