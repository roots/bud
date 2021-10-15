import type {
  Framework,
  WebpackPlugin,
} from '@roots/bud-framework'
import {Container} from '@roots/container'
import {ensureDirSync} from 'fs-extra'
import {isUndefined} from 'lodash'
import {WebpackConfigDumpPlugin} from 'webpack-config-dump-plugin'

interface Options {
  name?: string
  depth?: number
  keepCircularReferences?: boolean
  showFunctionNames?: boolean
  includeFalseValues?: boolean
}

interface BudConfigDumpPlugin
  extends WebpackPlugin<WebpackConfigDumpPlugin, Options> {}

const BudConfigDumpPlugin: BudConfigDumpPlugin = {
  name: 'webpack-config-dump-plugin',

  make: (options: Container<Options>) => {
    ensureDirSync(options.get('outputPath'))

    return new WebpackConfigDumpPlugin({
      ...options.all(),
    })
  },

  when: ({cache, store}) =>
    store.isTrue('debug') && !isUndefined(cache),

  options: (app: Framework) => ({
    name: `${app.name}.webpack.config.js`,
    outputPath: app.path('storage'),
    ...app.store.get('extension.webpack-config-dump-plugin'),
  }),
}

export const {name, make, when, options, register} =
  BudConfigDumpPlugin
