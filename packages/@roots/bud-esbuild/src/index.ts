import './interface'

import {Framework, Module} from '@roots/bud-framework'
import {ESBuildMinifyPlugin} from 'esbuild-loader'
import {setOptions, jsx} from './api'

/**
 * @module name @roots/bud-esbuild
 */
export const name: Module['name'] = '@roots/bud-esbuild'

/**
 * @module name @roots/bud-esbuild
 */
export const api: Module['api'] = (app: Framework) => ({
  esbuild: {
    setOptions: setOptions.bind(app),
    jsx: jsx.bind(app),
  },
})

/**
 * @module name @roots/bud-esbuild
 */
export const publish: Module['publish'] = (app: Framework) => ({
  /**
   * rule
   *
   * we may be adding ts to compilation and even if
   * we're not, we're totally going to override
   * ts-loader anyway.
   */
  rule: rules => ({
    ...rules,
    'rule/ts': app.subscribe('rule/ts'),
  }),

  /**
   * rule/ts
   */
  'rule/ts': () => ({
    test: app.subscribe('rule/ts/test'),
    exclude: app.subscribe('rule/ts/exclude'),
    use: app.subscribe('rule/ts/use'),
  }),
  'rule/ts/use': () => [app.subscribe('item/esbuild-ts')],
  'rule/ts/test': () => app.store.get('patterns.ts'),
  'rule/ts/exclude': () => app.store.get('patterns.modules'),

  /**
   * rule/js
   */
  'rule/js/use': () => [app.subscribe('item/esbuild-js')],

  /**
   * loader/esbuild
   */
  'loader/esbuild': () => require.resolve('esbuild-loader'),

  /**
   * item/esbuild-js
   */
  'item/esbuild-js': () => ({
    loader: app.subscribe('item/esbuild-js/loader'),
    options: app.subscribe('item/esbuild-js/options'),
  }),
  'item/esbuild-js/loader': () =>
    app.subscribe('loader/esbuild'),
  'item/esbuild-js/options': () => ({
    loader: app.subscribe('item/esbuild-js/options/loader'),
    target: app.subscribe('item/esbuild-js/options/target'),
  }),
  'item/esbuild-js/options/loader': () => 'jsx',
  'item/esbuild-js/options/target': () => 'es2015',

  /**
   * item/esbuild-ts
   */
  'item/esbuild-ts': () => ({
    loader: app.subscribe('item/esbuild-ts/loader'),
    options: app.subscribe('item/esbuild-ts/options'),
  }),

  /**
   * item/esbuild-ts loader
   */
  'item/esbuild-ts/loader': () =>
    app.subscribe('loader/esbuild'),

  /**
   * item/esbuild-ts options
   */
  'item/esbuild-ts/options': () => ({
    loader: app.subscribe('item/esbuild-ts/options/loader'),
    target: app.subscribe('item/esbuild-ts/options/target'),
    tsconfigRaw: app.subscribe(
      'item/esbuild-ts/options/tsconfigRaw',
    ),
  }),
  'item/esbuild-ts/options/loader': () => 'tsx',
  'item/esbuild-ts/options/target': () => 'es2015',
  'item/esbuild-ts/options/tsconfigRaw': () =>
    app.disk.get('project').has('tsconfig.json')
      ? app.disk.get('project').readJson('tsconfig.json')
      : {
          compilerOptions: {
            importsNotUsedAsValues: 'remove',
          },
        },

  'build/optimization/minimizer': [
    new ESBuildMinifyPlugin({
      target: app.subscribe('item/esbuild-js'),
      exclude: app.store.get('patterns.modules'),
    }),
  ],

  /**
   * build/resolve/extensions
   */
  'build/resolve/extensions': exts => [...exts, '.ts', '.tsx'],
})
