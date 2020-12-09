import type {Bud, Extension} from '@roots/bud-typings'
import Plugin, {PluginOptions} from 'mini-css-extract-plugin'

export const make: Extension.Make<Plugin, PluginOptions> = opt =>
  new Plugin(opt.getStore())

export const when: Extension.When = ({mode}) =>
  mode.is('production')

export const options: (bud: Bud) => PluginOptions = ({
  features,
}) => ({
  filename: features.enabled('hash')
    ? '[name].[hash].css'
    : '[name].css',
})
