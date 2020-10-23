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
        ...(userCfg.presets ?? []),
      ],
      plugins: [
        ...(options.plugins ?? []),
        ...(userCfg.plugins ?? []),
      ],
    },
  })

  return this
}

type Plugin = [babel.PluginItem, babel.PluginOptions]
type ConfigureBabel = Framework.Fluent<Framework.Bud, any>
