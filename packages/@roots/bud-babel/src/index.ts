import './interface'
import type {Module} from '@roots/bud-framework'
import {Config} from './Config'

export const name: Module['name'] = '@roots/bud-babel'

export const api: Module['api'] = app => ({
  babel: new Config().init(app),
})

export const devDependencies: Module['devDependencies'] = [
  '@babel/core',
]

export const publish: Module['publish'] = app => ({
  /**
   * loader/babel
   */
  'loader/babel': () => require.resolve('babel-loader'),

  /**
   * item/babel
   */
  'item/babel': () => ({
    loader: app.subscribe('loader/babel'),
    options: app.subscribe('item/babel/options'),
  }),

  'item/babel/options': () => ({
    cacheDirectory: app.subscribe(
      'item/babel/options/cacheDirectory',
    ),
    root: app.subscribe('item/babel/options/root'),
    presets: app.subscribe('item/babel/options/presets'),
    plugins: app.subscribe('item/babel/options/plugins'),
  }),

  'item/babel/options/root': () =>
    app.subscribe('location/project'),

  'item/babel/options/cacheDirectory': () => app.path('storage'),
  'item/babel/options/presets': () =>
    Object.values(app.babel.presets).map(([preset, options]) => [
      preset,
      options,
    ]),
  'item/babel/options/plugins': () =>
    Object.values(app.babel.plugins).map(([plugin, options]) => [
      plugin,
      options,
    ]),

  /**
   * rule/js/use
   */
  'item/babel/config': () => app.babel.hasProjectConfig,

  /**
   * rule/js/use
   */
  'rule/js/use': () => [app.subscribe('item/babel')],
})

export const boot: Module['boot'] = ({babel, info}) => {
  info('Configuring babel defaults')

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
}
