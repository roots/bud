import './interface'
import {Imagemin} from '@roots/bud-framework'
import {WebpackPlugin} from './WebpackPlugin'
import {Api} from './Api'

const Extension: Imagemin.Extension = {
  name: '@roots/bud-imagemin',
  api: app => ({
    imagemin: new Api(app),
  }),
  register: ({extensions}) => {
    extensions.add(WebpackPlugin)
  },
  boot: ({discovery, imagemin}) => {
    const plugins: [string, any][] = [
      ['gifsicle', {interlaced: true}],
      ['jpegtran', {progressive: true}],
      ['optipng', {optimizationLevel: 7}],
      ['svgo', {removeViewBox: false}],
    ]

    imagemin.plugins(
      plugins.filter(
        (plugin: Imagemin.ImageminPlugin): boolean =>
          discovery.hasPeerDependency(`imagemin-${plugin[0]}`),
      ),
    )
  },
}

export default Extension
