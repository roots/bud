import './interface'
import type {Module} from '@roots/bud-framework'
import {Item, Loader} from '@roots/bud-build'
import {Config} from './Config'
import {existsSync} from 'fs-extra'

const babel: Module = {
  name: '@roots/bud-babel',

  api: app => ({
    babel: new Config().init(app),
  }),

  register: ({build}) => {
    build.loaders.babel = new Loader(app =>
      require.resolve('babel-loader'),
    )

    build.items.babel = new Item({
      loader: app => app.build.loaders.babel,
      options: app => ({
        cacheDirectory: app.path('storage'),
        root: app.path('project'),
        presets: Object.values(app.babel.presets),
        plugins: Object.values(app.babel.plugins),
      }),
    })

    build.rules.js.setUse(app => [app.build.items.babel])
  },

  boot: ({babel, info, path}) => {
    const customConfig = existsSync(
      path('project', 'babel.config.js'),
    )

    info('Configuring babel defaults')

    !customConfig &&
      babel
        .setPresets(['@babel/preset-env'])
        .setPlugins([
          '@babel/plugin-transform-runtime',
          '@babel/plugin-proposal-object-rest-spread',
          '@babel/plugin-syntax-dynamic-import',
        ])
        .setPluginOptions('@babel/plugin-transform-runtime', {
          helpers: false,
        })
  },
}

export default babel
export const {name, api, register, boot} = babel
