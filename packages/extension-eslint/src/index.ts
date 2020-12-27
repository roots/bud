import Plugin from 'eslint-webpack-plugin'
import {Options, Make, When, Boot, Api} from './types'

/**
 * Bud custom formatter for teletype logging.
 */
import {eslintFormatter} from '@roots/bud-support'

/**
 * On boot, set defaults and add presets.
 */
export const boot: Boot = bud => {
  const path = bud.disk.get('@roots/bud-eslint')

  bud.features.set('eslint', true)

  bud.presets.set('eslint.roots', path.get('presets/roots.js'))
  bud.presets.set('eslint.react', path.get('presets/react.js'))
  bud.presets.set('eslint.wp', path.get('presets/wp.js'))
}

/**
 * Eslint class options.
 */
export const options: Options = bud => ({
  context: (bud as any).project(),
  eslintPath: require.resolve('eslint'),
  fix: false,
  formatter: eslintFormatter,
})

/**
 * Make the plugin from its options.
 */
export const make: Make = opts => new Plugin(opts.getStore())

/**
 * Make when
 */
export const when: When = ({features}) =>
  features.enabled('eslint')

/**
 * Extend config file API
 */
export const api: Api = () => ({
  eslintConfig: function (opts) {
    const plugin = this.extensions.get('@roots/bud-eslint')
    Object.entries(opts).map(([k, v]) => plugin.set(k, v))

    return this
  },
  enableEslint: function (enabled = true) {
    this.features[enabled ? `enable` : `disable`]('eslint')
    return this
  },
})
