import './interface'
import {Framework, Module} from '@roots/bud-framework'

export const name: Module['name'] = '@roots/bud-sass'

export const devDependencies: Module['devDependencies'] = [
  'sass',
]

export const publish: Module['publish'] = ({
  hooks,
  path,
  store,
  isProduction,
}: Framework) => ({
  'loader/sass': () => require.resolve('sass-loader'),

  'item/sass': () => ({
    loader: hooks.filter('item/sass/loader'),
    options: hooks.filter('item/sass/options'),
  }),

  'item/sass/loader': () => hooks.filter('loader/sass'),

  'item/sass/options': () => ({
    implementation: hooks.filter(
      'item/sass/options/implementation',
    ),
    sourceMap: hooks.filter('item/sass/options/sourceMap'),
  }),

  'item/sass/options/implementation': () => {
    global.navigator = undefined

    const sass = (() =>
      require(path('project', 'node_modules/sass')))()

    return sass
  },

  'item/sass/options/sourceMap': () => true,

  rule: rules => ({
    ...rules,
    'rule/sass': hooks.filter('rule/sass'),
  }),
  'rule/sass': () => ({
    test: hooks.filter('rule/sass/test'),
    exclude: hooks.filter('rule/sass/exclude'),
    use: hooks.filter('rule/sass/use'),
  }),
  'rule/sass/test': () => store.get('patterns.sass'),
  'rule/sass/exclude': () => store.get('patterns.modules'),
  'rule/sass/use': () => [
    isProduction
      ? hooks.filter('item/minicss')
      : hooks.filter('item/style'),
    hooks.filter('item/css'),
    hooks.filter('item/postcss'),
    hooks.filter('item/resolve-url'),
    hooks.filter('item/sass'),
  ],

  /**
   * build/resolve/extensions
   */
  'build/resolve/extensions': exts => [...exts, '.scss'],
})
