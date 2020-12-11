import {
  CleanWebpackPlugin as Plugin,
  Options as PluginOptions,
} from 'clean-webpack-plugin'
import type {Extension} from '@roots/bud-typings'

export const make: Extension.Module.Make<
  Plugin,
  PluginOptions
> = opt => new Plugin(opt.getStore())

export const when: Extension.Module.When = bud =>
  bud.features.enabled('clean')

export const options: PluginOptions = {
  cleanOnceBeforeBuildPatterns: ['**/*', '!dll/*'],
}
