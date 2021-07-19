import {WebpackConfigDumpPlugin} from 'webpack-config-dump-plugin'

import type {Plugin} from '@roots/bud-framework'

const extension: Plugin<
  WebpackConfigDumpPlugin,
  {
    outputPath?: string
    name?: string
    depth?: number
    keepCircularReferences?: boolean
    showFunctionNames?: boolean
    includeFalseValues?: boolean
  }
> = {
  name: `webpack-config-dump-plugin`,
  make: options =>
    new WebpackConfigDumpPlugin({...options.all()}),
  when: ({store}) => store.isTrue('debug'),
  options: app => ({
    ...(app.store.get('extension.webpackConfigDumpPlugin') ??
      {}),
    outputPath: app.path('storage'),
    name: `${app.name}.webpack.config.js`,
  }),
}

export const {name, make, when, options} = extension
