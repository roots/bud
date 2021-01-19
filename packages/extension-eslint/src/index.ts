import Plugin from 'eslint-webpack-plugin'
import {Options, PluginOptions} from './types'

// Bud custom formatter
import {eslintFormatter} from '@roots/bud-support'

/**
 * Extension identifier
 */
export const name = '@roots/bud-eslint'

/**
 * Eslint class options.
 */
export const options: Options = app => {
  const options: PluginOptions = {
    eslintPath: require.resolve('eslint'),
    fix: false,
    cache: true,
    cacheLocation: app.disk.path.join(
      app.options.get('project'),
      app.options.get('storage'),
    ),
    quiet: true,
    formatter: eslintFormatter,
    baseConfig: {
      extends: ['eslint:recommended'],
      parser: require.resolve('babel-eslint'),
      env: {
        node: true,
        es6: true,
        amd: true,
        browser: true,
        jquery: true,
      },
      parserOptions: {
        ecmaFeatures: {
          globalReturn: true,
          generators: false,
          objectLiteralDuplicateProperties: false,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
      },
      plugins: ['import'],
      settings: {
        'import/core-modules': [],
        'import/ignore': [
          'node_modules',
          '\\.(coffee|scss|css|less|hbs|svg|json)$',
        ],
      },
    },
    overrideConfig: {
      globals: Object.entries(
        app.extensions
          .get('webpack-define-plugin')
          .access('options'),
      ).reduce(
        (a, [k]) => ({
          ...a,
          [k]: true,
          wp: true,
        }),
        {},
      ),
    },
  }

  if (app.disk.get('project').has('.eslintignore')) {
    options.ignorePath = app.disk.path.join(
      app.options.get('project'),
      '.eslintignore',
    )
  }

  return options
}

/**
 * Make the plugin from its options.
 */
export const make = opts => new Plugin(opts.all())

/**
 * Extend config file API
 */
export const api = () => ({
  eslint: function (opts) {
    const plugin = this.extensions.get('@roots/bud-eslint')
    Object.entries(opts).map(([k, v]) =>
      plugin.set(`options.${k}`, v),
    )

    return this
  },
})
