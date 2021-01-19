import Plugin from 'eslint-webpack-plugin'
import {Options, Make, When} from './types'
import {Bud} from '@roots/bud'
// Bud custom formatter
import {eslintFormatter} from '@roots/bud-support'

/**
 * Extension identifier
 */
export const name = '@roots/bud-eslint'

/**
 * Eslint class options.
 */
export const options: Options = bud => ({
  eslintPath: require.resolve('eslint'),
  fix: false,
  formatter: eslintFormatter,
})

/**
 * Make the plugin from its options.
 */
export const make: Make = opts => new Plugin(opts.all())

/**
 * Make when
 */
export const when: When = ({options}: Bud) =>
  options.enabled('eslint')

/**
 * Extend config file API
 */
export const api = () => ({
  eslintConfig: function (opts) {
    const plugin = this.extensions.get('@roots/bud-eslint')
    Object.entries(opts).map(([k, v]) =>
      plugin.set(`options.${k}`, v),
    )

    return this
  },
})
