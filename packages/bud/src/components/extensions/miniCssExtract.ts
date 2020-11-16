import type {Extension} from '@roots/bud-typings'
import Plugin, {PluginOptions} from 'mini-css-extract-plugin'

export const make: Extension.Make = opt => new Plugin(opt.all())
export const when: Extension.When = ({mode}) =>
  mode.is('production')
export const options: Options = ({features}) => ({
  filename: features.enabled('hash')
    ? '[name].[hash].css'
    : '[name].css',
})

export type Options = Extension.Options<PluginOptions>
