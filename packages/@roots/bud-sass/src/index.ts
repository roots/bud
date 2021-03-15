import './interface'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'

export const name: Module['name'] = '@roots/bud-sass'

export const devDependencies: Module['devDependencies'] = [
  'sass',
]

export const topics: Module['topics'] = (app: Framework) => [
  'loader/sass',
  'item/sass',
  'item/sass/loader',
  'item/sass/options',
  'item/sass/options/implementation',
  'item/sass/options/sourceMap',
  'rule/sass',
  'rule/sass/test',
  'rule/sass/exclude',
  'rule/sass/use',
]

export const publish: Module['publish'] = (app: Framework) => ({
  /**
   * loader/sass
   */
  'loader/sass': () => require.resolve('sass-loader'),

  /**
   * item/sass
   */
  'item/sass': () => ({
    loader: app.subscribe('item/sass/loader'),
    options: app.subscribe('item/sass/options'),
  }),
  'item/sass/loader': () => app.subscribe('loader/sass'),
  'item/sass/options': () => ({
    implementation: app.subscribe(
      'item/sass/options/implementation',
    ),
    sourceMap: app.subscribe('item/sass/options/sourceMap'),
  }),
  'item/sass/options/implementation': () => {
    global.navigator = undefined

    try {
      require('sass')
    } catch (err) {
      app.logger.framework.scope('@roots/sass').error(err)
      process.exit()
    }

    global.navigator = {}
  },
  'item/sass/options/sourceMap': () => true,

  /**
   * rule/sass
   */
  'rule/sass': () => ({
    test: app.subscribe('rule/sass/test'),
    exclude: app.subscribe('rule/sass/exclude'),
    loader: app.subscribe('rule/sass/loader'),
  }),
  'rule/sass/test': () => app.store.get('patterns.sass'),
  'rule/sass/exclude': () => app.store.get('patterns.modules'),
  'rule/sass/use': () => [
    app.isProduction
      ? app.subscribe('item/minicss')
      : app.subscribe('item/style'),
    app.subscribe('item/css'),
    app.subscribe('item/postcss'),
    app.subscribe('item/resolveUrl'),
    app.subscribe('item/sass'),
  ],

  /**
   * build/resolve/extensions
   */
  'build/resolve/extensions': e => [...e, '.scss'],
})
