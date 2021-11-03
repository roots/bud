import type {Extension} from '@roots/bud-framework'

import {BudImageMinPlugin} from './BudImageMinPlugin'
import {Config} from './Config'

export const BudImageMinExtension: Extension.Module = {
  name: '@roots/bud-imagemin',

  api: app => ({
    imagemin: new Config(app),
  }),

  register: app => {
    app.extensions.add(BudImageMinPlugin)

    const plugins: Array<[string, {[key: string]: any}]> = [
      ['imagemin-gifsicle', {interlaced: true}],
      ['imagemin-jpegtran', {progressive: true}],
      ['imagemin-optipng', {optimizationLevel: 7}],
    ]

    const eligiblePlugins: Array<
      [string, {[key: string]: any}]
    > = plugins?.filter(([name]) => {
      try {
        require.resolve(name)
        return true
      } catch (e) {
        return false
      }
    })

    app.imagemin.plugins(eligiblePlugins)
  },
}
