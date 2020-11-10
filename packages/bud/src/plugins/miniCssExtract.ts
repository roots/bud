import type {Extension} from '@roots/bud-extensions'
import Plugin, {PluginOptions} from 'mini-css-extract-plugin'

export const make: Make = opt => new Plugin(opt.all())
export const when: When = ({mode}) => mode.is('production')
export const options: RawOptions = ({features}) => ({
  filename: features.enabled('hash')
    ? '[name].[hash].css'
    : '[name].css',
})

export type RawOptions = Extension.RawOptions<PluginOptions>
export type Options = Extension.Options<RawOptions>
export type Make = Extension.Make<Plugin, Options>
export type When = Extension.When<Options>
