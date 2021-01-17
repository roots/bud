import {
  CleanWebpackPlugin as Plugin,
  Options as PluginOptions,
} from 'clean-webpack-plugin'
import {Module} from '@roots/bud-typings'

export const make: Module.Make<
  Plugin,
  PluginOptions
> = options => new Plugin(options.all())

export const when: Module.When = (bud, options) =>
  bud.options.enabled('clean') && options.getEntries().length > 0

export const options: Module.Options<PluginOptions> = {
  cleanOnceBeforeBuildPatterns: ['**/*', '!dll/*'],
}
