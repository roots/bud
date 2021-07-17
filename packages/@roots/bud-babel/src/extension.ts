import './interface'
import {Item, Loader} from '@roots/bud-build'
import {Config} from './Config'
import {existsSync} from 'fs-extra'
import type {Framework, Module} from '@roots/bud-framework'

export const name: Module['name'] = '@roots/bud-babel'

export const api: Module['api'] = (app: Framework) => ({
  babel: new Config().init(app),
})

export const register: Module['register'] = ({build}) => {
  build.loaders.babel = new Loader(
    require.resolve('babel-loader'),
  )

  build.items.babel = new Item({
    loader: ({build}) => build.loaders.babel,
    options: ({path, babel}) => ({
      cacheDirectory: path('storage', 'cache/babel'),
      root: path('src'),
      presets: Object.values(babel.presets),
      plugins: Object.values(babel.plugins),
    }),
  })

  build.rules.js.setUse(({build}) => [build.items.babel])
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
