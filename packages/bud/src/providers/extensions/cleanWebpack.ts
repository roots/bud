import {
  CleanWebpackPlugin as Plugin,
  Options as PluginOptions,
} from 'clean-webpack-plugin'
import {Bud} from '../../Bud'

export const make: Bud.Module.Make<
  Plugin,
  PluginOptions
> = options => new Plugin(options.all())

export const options: Bud.Module.Options<PluginOptions> = () => ({
  cleanOnceBeforeBuildPatterns: ['**/*', '!dll'],
})
