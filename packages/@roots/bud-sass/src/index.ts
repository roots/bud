import './interface'
import {Framework} from '@roots/bud-framework'

/**
 * @module @roots/bud-sass
 * @description Sass transpilation for @roots/bud projects
 * @see https://github.com/roots/bud
 */

export const name: Framework.Module['name'] = '@roots/bud-sass'

export const devDependencies: Framework.Module['devDependencies'] = [
  'sass',
]

/**
 * Hook config values
 *
 * @see @roots/bud-extensions
 * @see @roots/bud-hooks
 */
export const publish: Framework.Module['publish'] = (
  app: Framework,
) => ({
  /**
   * loader/sass
   */
  'loader/sass': () => require.resolve('sass-loader'),

  /**
   * item/sass
   */
  ['item/sass']: () => ({
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

  /**
   * Implementation will try to resolve sass & node-sass, preferring
   * sass.
   */
  'item/sass/options/implementation': () => {
    global.navigator = undefined

    const sass = (() =>
      require(app.path('project', 'node_modules/sass')))()

    global.navigator = {}

    return sass
  },
  'item/sass/options/sourceMap': () => true,

  /**
   * rule/sass
   */
  rule: rules => ({
    ...rules,
    'rule/sass': app.subscribe('rule/sass'),
  }),
  'rule/sass': () => ({
    test: app.subscribe('rule/sass/test'),
    exclude: app.subscribe('rule/sass/exclude'),
    use: app.subscribe('rule/sass/use'),
  }),
  'rule/sass/test': () => app.store.get('patterns.sass'),
  'rule/sass/exclude': () => app.store.get('patterns.modules'),
  'rule/sass/use': () => [
    app.isProduction
      ? app.subscribe('item/minicss')
      : app.subscribe('item/style'),
    app.subscribe('item/css'),
    app.subscribe('item/postcss'),
    app.subscribe('item/resolve-url'),
    app.subscribe('item/sass'),
  ],

  /**
   * build/resolve/extensions
   */
  'build/resolve/extensions': e => [...e, '.scss'],
})
