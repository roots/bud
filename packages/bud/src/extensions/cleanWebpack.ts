import {
  CleanWebpackPlugin as Plugin,
  Options as PluginOptions,
} from 'clean-webpack-plugin'
import {Module} from '@roots/bud-typings'

export const make: Module.Make<Plugin, PluginOptions> = opt =>
  new Plugin(opt.getStore())

export const when: Module.When = bud =>
  bud.features.enabled('clean')

export const options: PluginOptions = {
  cleanOnceBeforeBuildPatterns: ['**/*', '!dll/*'],
}
