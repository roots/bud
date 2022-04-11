import TerserPlugin from 'terser-webpack-plugin'

import {Extension} from './'
import {terser} from './terser.api'

export const label: Extension['label'] = '@roots/bud-terser'

export const options: Extension['options'] = app => ({
  include: app.hooks.filter('pattern.js'),
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

export const register: Extension['register'] = async ({api}) => api.bindFacade('terser', terser)

export const boot: Extension['boot'] = async ({extensions, hooks}) => {
  hooks.on('build.optimization.minimizer', minimizer => {
    minimizer.push(
      new TerserPlugin(extensions.get('@roots/bud-terser').options.all()),
    )

    return minimizer
  })
}
