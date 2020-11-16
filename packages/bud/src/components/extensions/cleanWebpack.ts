import {
  CleanWebpackPlugin as Plugin,
  Options as PluginOptions,
} from 'clean-webpack-plugin'
import type {Extension} from '@roots/bud-typings'

export const make: Extension.Make = opt => new Plugin(opt.all())

export const when: Extension.When = bud =>
  bud.features.enabled('clean')

export const options: Extension.Options<PluginOptions> = {
  cleanOnceBeforeBuildPatterns: ['**/*', '!dll/*'],
}
