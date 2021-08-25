import type {Imagemin} from './'
import {Config} from './Config'
import {WebpackPlugin} from './WebpackPlugin'

const extension: Imagemin.Extension = {
  name: '@roots/bud-imagemin',

  register(app) {
    app.extensions.add(WebpackPlugin)
    app.extensions.bindClass({
      imagemin: [Config, app],
    })
  },

  boot: ({discovery, imagemin}) => {
    const plugins: [string, any][] = [
      ['imagemin-gifsicle', {interlaced: true}],
      ['imagemin-jpegtran', {progressive: true}],
      ['imagemin-optipng', {optimizationLevel: 7}],
    ]

    imagemin.plugins(
      plugins.filter(
        (plugin: Imagemin.ImageminPlugin): boolean =>
          discovery.hasPeerDependency(plugin[0]),
      ),
    )
  },
}

export {extension}
