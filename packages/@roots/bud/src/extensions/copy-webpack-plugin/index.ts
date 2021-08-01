/**
 * @module @roots/bud
 */

import {Module} from '@roots/bud-framework'
import * as CopyPlugin from 'copy-webpack-plugin'
import {CopyPluginOptions} from 'copy-webpack-plugin'

const copyPluginExtension: Module<
  CopyPlugin,
  CopyPluginOptions
> = {
  name: 'copy-webpack-plugin',

  options: {
    patterns: [],
  },

  make: options => new CopyPlugin(options.all()),

  when(_app, options) {
    return (
      options.has('patterns') &&
      options.get('patterns')?.length > 0
    )
  },
}

export const {name, options, make, when} = copyPluginExtension
