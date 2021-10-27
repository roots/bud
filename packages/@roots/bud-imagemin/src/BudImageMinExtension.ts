import type {Extension} from '@roots/bud-framework'

import {BudImageMinPlugin} from './BudImageMinPlugin'
import {Config} from './Config'

export interface BudImageMinExtension extends Extension.Module {}

export const BudImageMinExtension: BudImageMinExtension = {
  name: '@roots/bud-imagemin',

  register: app => {
    app.extensions.add(BudImageMinPlugin)
    app.extensions.bindClass({
      imagemin: [Config, app],
    })
  },

  boot: ({imagemin}) => {
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

    imagemin.plugins(eligiblePlugins)
  },
}
