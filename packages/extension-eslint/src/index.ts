import Framework from '@roots/bud-typings'
import Plugin, {
  Options as PluginOptions,
} from 'eslint-webpack-plugin'

/**
 * Bud custom formatter for teletype logging.
 */
import {eslintFormatter as formatter} from '@roots/bud-support'

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
  context: bud.project(),
  eslintPath: require.resolve('eslint'),
  fix: false,
  formatter,
})

/**
 * Make the plugin from its options.
 */
export const make: Make = opts => new Plugin(opts.all())

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

declare type RawOptions = Framework.Extension.Options<
  PluginOptions
>
declare type Options = Framework.Extension.Options<RawOptions>
declare type Make = Framework.Extension.Make<
  Plugin,
  Framework.Container
>
declare type When = Framework.Extension.When
declare type Boot = Framework.Extension.Boot
export declare type Api = (
  bud: Framework.Bud.Contract,
) => EslintConfig
export declare type EslintConfig = {
  enableEslint: ToggleEslint
  eslintConfig: ConfigureEslint
}

/**
 * Configure ESLint options
 */
export declare type ConfigureEslint = (
  this: Framework.Bud.Contract,
  opts: PluginOptions,
) => Framework.Bud.Contract

/**
 * Toggle Eslint on and off
 */
export declare type ToggleEslint = (
  this: Framework.Bud.Contract,
  enabled?: boolean,
) => Framework.Bud.Contract
