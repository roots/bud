import './interface'

import {Item, Loader} from '@roots/bud-build'
import type {Framework, Module} from '@roots/bud-framework'
import {existsSync} from 'fs-extra'

import {Config} from './Config'

export const name: Module['name'] = '@roots/bud-babel'

export const api: Module['api'] = (app: Framework) => ({
  babel: new Config().init(app),
})

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

export const boot: Module['boot'] = app => {
  !existsSync(app.path('project', 'babel.config.js')) &&
    app.babel
      .setPresets(['@babel/preset-env'])
      .setPlugins([
        ['@babel/plugin-transform-runtime', {helpers: false}],
        '@babel/plugin-proposal-object-rest-spread',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
      ])
}
