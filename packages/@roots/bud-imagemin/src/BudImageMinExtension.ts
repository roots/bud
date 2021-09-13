import type {Extension} from '@roots/bud-framework'

import {BudImageMinPlugin} from './BudImageMinPlugin'
import {Config} from './Config'

interface BudImageMinExtension extends Extension.Module {}

const BudImageMinExtension: BudImageMinExtension = {
  name: '@roots/bud-imagemin',

  register(app): void {
    app.extensions.add(BudImageMinPlugin)
    app.extensions.bindClass({
      imagemin: [Config, app],
    })
  },

  boot({project, imagemin}): void {
    const plugins: Array<[string, {[key: string]: any}]> = [
      ['imagemin-gifsicle', {interlaced: true}],
      ['imagemin-jpegtran', {progressive: true}],
      ['imagemin-optipng', {optimizationLevel: 7}],
    ]

    const eligiblePlugins: Array<
      [string, {[key: string]: any}]
    > = plugins?.filter(([name]) =>
      project.hasPeerDependency(name),
    )

    eligiblePlugins.length > 0 &&
      imagemin.plugins(eligiblePlugins)
  },
}

export {BudImageMinExtension}
