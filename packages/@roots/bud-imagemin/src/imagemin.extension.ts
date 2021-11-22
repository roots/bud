import type {Extension} from '@roots/bud-framework'

import {Config} from './imagemin.config'
import {BudImageMinPlugin} from './imagemin.plugin'

export const BudImageMinExtension: Extension.Module = {
  name: '@roots/bud-imagemin',

  /**
   * Exposes app.babel configuration utility
   *
   * @public
   */
  mixin: async app => ({
    imagemin: [Config, app],
  }),

  register: async app => {
    await app.extensions.add(BudImageMinPlugin)
  },

  boot: async app => {
    const plugins: Array<[string, {[key: string]: any}]> = [
      ['imagemin-gifsicle', {interlaced: true}],
      ['imagemin-jpegtran', {progressive: true}],
      ['imagemin-optipng', {optimizationLevel: 7}],
    ]

    const eligiblePlugins = await Promise.all(
      plugins.map(
        async ([name, options]): Promise<Array<any>> => {
          try {
            const pluginModule = await import(name)
            return pluginModule ? [name, options] : []
          } catch (e) {
            app.error(e)
            return []
          }
        },
      ),
    )

    app.imagemin.setPlugins(
      eligiblePlugins.filter(plugin => plugin !== []),
    )
  },
}
