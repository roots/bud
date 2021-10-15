import type {Extension} from '@roots/bud-framework'
import type {CopyPluginOptions} from 'copy-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'

const copyPluginExtension: Extension.CompilerPlugin<
  CopyPlugin,
  CopyPluginOptions
> = {
  name: 'copy-webpack-plugin',

  options: {patterns: []},

  make: options =>
    new (require('copy-webpack-plugin'))(options.all()),

  when(_app, options) {
    return (
      options.has('patterns') &&
      options.get('patterns')?.length > 0
    )
  },
}

export const {name, options, make, when} = copyPluginExtension
