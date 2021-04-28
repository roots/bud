import './interface'
import {Framework, Module} from '@roots/bud-framework'

export const name: Module['name'] = '@roots/bud-sass'

export const devDependencies: Module['devDependencies'] = [
  'sass',
]

export const publish: Module['publish'] = (app: Framework) => ({
  'loader/sass': () => require.resolve('sass-loader'),

  'item/sass': () => ({
    loader: app.hooks.filter('item/sass/loader'),
    options: app.hooks.filter('item/sass/options'),
  }),
  'item/sass/loader': () => app.hooks.filter('loader/sass'),
  'item/sass/options': () => ({
    implementation: app.hooks.filter(
      'item/sass/options/implementation',
    ),
    sourceMap: app.hooks.filter('item/sass/options/sourceMap'),
  }),

  /**
   * Implementation will try to resolve sass & node-sass, preferring
   * sass.
   */
  'item/sass/options/implementation': () => {
    global.navigator = undefined

    const sass = (() =>
      require(app.path('project', 'node_modules/sass')))()

    return sass
  },
  'item/sass/options/sourceMap': () => true,

  rule: rules => ({
    ...rules,
    'rule/sass': app.hooks.filter('rule/sass'),
  }),
  'rule/sass': () => ({
    test: app.hooks.filter('rule/sass/test'),
    exclude: app.hooks.filter('rule/sass/exclude'),
    use: app.hooks.filter('rule/sass/use'),
  }),
  'rule/sass/test': () => app.store.get('patterns.sass'),
  'rule/sass/exclude': () => app.store.get('patterns.modules'),
  'rule/sass/use': () => [
    app.isProduction
      ? app.hooks.filter('item/minicss')
      : app.hooks.filter('item/style'),
    app.hooks.filter('item/css'),
    app.hooks.filter('item/postcss'),
    app.hooks.filter('item/resolve-url'),
    app.hooks.filter('item/sass'),
  ],

  /**
   * build/resolve/extensions
   */
  'build/resolve/extensions': exts => [...exts, '.scss'],
})
