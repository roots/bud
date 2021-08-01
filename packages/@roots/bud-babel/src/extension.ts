/**
 * @module @roots/bud-babel
 */

import './interface'

import {Item, Loader} from '@roots/bud-build'
import type {Framework, Module} from '@roots/bud-framework'
import {existsSync} from 'fs-extra'

import {DEFAULT_PLUGINS, DEFAULT_PRESETS} from './'
import {Config} from './Config'

/**
 * @exports name
 */
export const name: Module['name'] = '@roots/bud-babel'

/**
 * @exports api
 */
export const api: Module['api'] = (app: Framework) => ({
  babel: new Config().init(app),
})

/**
 * @exports register
 */
export const register: Module['register'] = app => {
  app.build.loaders.babel = new Loader(
    require.resolve('babel-loader'),
  )

  app.build.items.babel = new Item({
    loader: ({build}) => build.loaders.babel,
    options: app => {
      const options: {
        cacheDirectory: string
        root: string
        presets?: any
        plugins?: any
      } = {
        cacheDirectory: app.path('storage', 'cache/babel'),
        root: app.path('src'),
      }

      if (app.babel?.presets) {
        options.presets = Object.values(app.babel.presets)
      }

      if (app.babel?.plugins) {
        options.plugins = Object.values(app.babel.plugins)
      }

      return options
    },
  })

  app.build.rules.js.setUse(({build}) => [build.items.babel])
}

/**
 * @exports boot
 */
export const boot: Module['boot'] = app => {
  !existsSync(app.path('project', 'babel.config.js')) &&
    app.babel
      .setPresets(DEFAULT_PRESETS)
      .setPlugins(DEFAULT_PLUGINS)
}
