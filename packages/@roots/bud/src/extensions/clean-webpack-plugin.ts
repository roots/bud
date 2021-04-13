import {
  Options,
  CleanWebpackPlugin as Plugin,
} from 'clean-webpack-plugin'
import {Module} from '@roots/bud-framework'

export const name = 'clean-webpack-plugin'

export const options: Module.Options<Options> = {
  cleanOnceBeforeBuildPatterns: ['**/*', '!dll'],
}

export const make: Module.Make<Plugin, Options> = options =>
  new Plugin(options.all())
