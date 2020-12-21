import type {Framework, Module} from '@roots/bud-typings'
import Plugin, {PluginOptions} from 'mini-css-extract-plugin'

export const make: Module.Make<Plugin, PluginOptions> = opt =>
  new Plugin(opt.getStore())

export const when: Module.When = ({mode}) =>
  mode.is('production')

export const options: (bud: Framework) => PluginOptions = ({
  features,
}) => ({
  filename: features.enabled('hash')
    ? '[name].[hash].css'
    : '[name].css',
})
