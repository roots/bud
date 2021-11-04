import type {Framework} from '@roots/bud-framework'

import * as api from './terser.api'
import {TerserPlugin} from './terser.dependencies'

export const name = '@roots/bud-terser'

export const options = (app: Framework) => ({
  parallel: app.hooks.filter('build/parallelism'),
  include: app.store.get('patterns.js'),
  extractComments: false,
  terserOptions: {
    parse: {
      ecma: 2018,
    },
    compress: false,
    mangle: {
      safari10: true,
    },
    output: {
      ecma: 5,
      comments: false,
      ascii_only: true,
    },
  },
})

export const boot = ({extensions, hooks, store}) => {
  hooks.on('build/optimization/minimizer', minimizer => {
    minimizer.push(
      new TerserPlugin(
        extensions.get('terser-webpack-plugin').options.all(),
      ),
    )
    return minimizer
  })
}

export {api}
