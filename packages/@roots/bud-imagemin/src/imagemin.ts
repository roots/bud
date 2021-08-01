/**
 * @module @roots/bud-imagemin
 */

import {Imagemin} from '@roots/bud-framework'

import {Config} from './Config'
import {WebpackPlugin} from './WebpackPlugin'

/**
 * @const extension
 */
const extension: Imagemin.Extension = {
  /**
   * @property {Imagemin.Extension.name} name
   */
  name: '@roots/bud-imagemin',

  /**
   * @property {Imagemin.Extension.api} api
   */
  api: app => ({
    imagemin: new Config(app),
  }),

  /**
   * @property {Imagemin.Extension.register} register
   */
  register: ({extensions}) => {
    extensions.add(WebpackPlugin)
  },

  /**
   * @property {Imagemin.Extension.boot} boot
   */
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

/**
 * @exports extension
 */
export {extension}
