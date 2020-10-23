import {lodash as _} from '@roots/bud-support'

/**
 * Set babel plugins.
 */
export const babel: ConfigureBabel = function (userCfg: {
  plugins: Plugin[]
  presets: Plugin[]
}) {
  const {options, ...babel} = this.build.getItem('babel') as any // 😇

  this.build.setItem('babel', {
    ...babel,
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

type Plugin = [babel.PluginItem, babel.PluginOptions]
type ConfigureBabel = Framework.Fluent<Framework.Bud, any>
