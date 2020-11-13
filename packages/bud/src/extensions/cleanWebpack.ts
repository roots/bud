import {
  CleanWebpackPlugin as Plugin,
  Options as PluginOptions,
} from 'clean-webpack-plugin'
import type {Extension} from '@roots/bud-extensions'

export const make: Make = opt => new Plugin(opt.all())
export const when: When = bud => bud.features.enabled('clean')
export const options: RawOptions = {
  cleanOnceBeforeBuildPatterns: ['**/*', '!dll/*'],
}

declare type Make = Extension.Make<Plugin, Options>
declare type RawOptions = Extension.RawOptions<PluginOptions>
declare type Options = Extension.Options<RawOptions>
declare type When = Extension.When<Options>
