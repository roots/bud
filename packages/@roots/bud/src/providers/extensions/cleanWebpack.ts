import {
  Options,
  CleanWebpackPlugin as Plugin,
} from 'clean-webpack-plugin'
import {Bud} from '../../Bud'

export const make: Bud.Module.Make<Plugin, Options> = options =>
  new Plugin(options.all())

export const options: Bud.Module.Options<Options> = () => ({
  cleanOnceBeforeBuildPatterns: ['**/*', '!dll'],
})
