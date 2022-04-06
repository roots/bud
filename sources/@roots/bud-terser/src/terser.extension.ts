import TerserPlugin from 'terser-webpack-plugin'

import {Extension} from './'
import {terser} from './terser.api'

export const name: Extension['name'] = '@roots/bud-terser'

export const options: Extension['options'] = app => ({
  include: app.store.get('patterns.js'),
  extractComments: false,
  terserOptions: {
    parse: {ecma: 2018},
    compress: false,
    mangle: {safari10: true},
    output: {
      ecma: 5,
      comments: false,
      ascii_only: true,
    },
  },
})

export const boot: Extension['boot'] = ({extensions, hooks}) => {
  hooks.on('build.optimization.minimizer', minimizer => {
    minimizer.push(
      new TerserPlugin(extensions.get('@roots/bud-terser').options.all()),
    )
    return minimizer
  })
}

export const api: Extension['api'] = {terser}
