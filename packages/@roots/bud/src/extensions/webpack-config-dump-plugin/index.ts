import {
  ensureDirSync,
  WebpackConfigDumpPlugin,
} from './webpack-config-dump-plugin.dependencies'
import type {Plugin} from './webpack-config-dump-plugin.interface'

const BudConfigDumpPlugin: Plugin = {
  name: 'webpack-config-dump-plugin',

  make: options => {
    ensureDirSync(options.get('outputPath'))

    return new WebpackConfigDumpPlugin({
      ...options.all(),
    })
  },

  options: app => ({
    name: `${app.name}.webpack.config.js`,
    outputPath: app.path('storage'),
    ...app.store.get('extension.webpack-config-dump-plugin'),
  }),
}

export const {name, make, when, options, register} =
  BudConfigDumpPlugin
