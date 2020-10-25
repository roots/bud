import {lodash as _} from '@roots/bud-support'

/**
 * Merge babel transformOptions
 */
export const mergeConfig: Babel.Config = function (
  cfg: Babel.TransformOptions,
) {
  const {options} = this.bud.build.getItem('babel') as any // 😇

  this.bud.build.mergeItem('babel', {
    options: {
      ...options,
      ...cfg,
      presets: [
        ...(options.presets ?? []),
        ...(cfg.presets
          ? cfg.presets.map(preset =>
              typeof preset === 'object' ? preset : [preset],
            )
          : []),
      ],
      plugins: [
        ...(options.plugins ?? []),
        ...(cfg.plugins
          ? cfg.plugins.map(plugin =>
              typeof plugin === 'object' ? plugin : [plugin],
            )
          : []),
      ],
    },
  })

  return this
}
