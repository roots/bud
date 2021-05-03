import './interface'
import {Module} from '@roots/bud-framework'

const extension: Module = {
  name: '@roots/bud-sass',
  publish: ({hooks, store, isProduction}) => ({
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

    'item/sass/options/implementation': () =>
      (() => require(require.resolve('sass')))(),

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

    'build/resolve/extensions': (exts: string[]) => [
      ...exts,
      '.scss',
    ],
  }),
}

export default extension
export const {name, publish} = extension
